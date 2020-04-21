<template>
	<v-container>
		<v-layout row>
			<v-layout column>
				<v-select
					v-model="rows"
					label="# of Rows"
					:items="rowsList"
					hint="Choose number of rows for this puzzle"
					persistent-hint
				></v-select>
			</v-layout>
			<v-layout column>
				<v-layout col>
					<v-select
						v-model="columns"
						label="# of Columns"
						:items="columnsList"
						hint="Choose number of columns for this puzzle"
						persistent-hint
					></v-select>
				</v-layout>
			</v-layout>
		</v-layout>
		<v-layout row>
			<v-layout column>
				<v-text-field
					label="Scrambled Letters"
					v-model="scrambled"
					name="scrambled"
					:rules="[...rules]"
					:counter="maxChars"
					:maxlength="maxChars"
					pattern="^\w+$"
					clearable
					required
				></v-text-field>
			</v-layout>
			<v-layout column>
				<v-text-field
					label="Quote"
					v-model="quote"
					name="quote"
					:rules="[v => v.length <= this.maxChars || 'Max 25 characters']"
					:counter="maxChars"
					:maxlength="maxChars"
					pattern="^[_-]+$"
					clearable
					required
				></v-text-field>
			</v-layout>
		</v-layout>
		<v-layout row>
			<puzzle-grid
				:columns="columns"
				:rows="rows"
				:scrambled="scrambled"
				:quote="quote"
				mode="edit"
			/>
		</v-layout>
		<v-layout row wrap>
			<v-btn block color="primary" dark>Save</v-btn>
		</v-layout>
	</v-container>
</template>

<script>
// import { randomStr } from '@/utils';
import PuzzleGrid from '../components/PuzzleGrid.vue';

export default {
	components: {
		PuzzleGrid,
	},
	data: () => ({
		columns: 16,
		rows: 4,
		scrambled: '',
		quote: '',
		columnsList: [14, 15, 16, 17, 18],
		rowsList: [3, 4, 5, 6],
		rules: {
			required: value => Boolean(value) || 'Required.',
			min: v => v.length >= this.maxChars || `Must be ${this.maxChars} length`,
		},
	}),
	computed: {
		columnsCount() {
			return parseInt(this.columns, 10);
		},
		maxChars() {
			return this.rows * this.columns;
		},
	},
};
</script>
