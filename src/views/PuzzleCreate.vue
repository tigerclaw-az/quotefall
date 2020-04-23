<template>
	<v-container>
		<v-form v-model="validPuzzle" @submit.prevent="savePuzzle()">
			<v-row>
				<v-col cols="12" md="6">
					<v-select
						v-model="rows"
						label="# of Rows"
						:items="rowsList"
						hint="Choose number of rows for this puzzle"
						persistent-hint
					></v-select>
				</v-col>
				<v-col cols="12" md="6">
					<v-select
						v-model="columns"
						label="# of Columns"
						:items="columnsList"
						hint="Choose number of columns for this puzzle"
						persistent-hint
					></v-select>
				</v-col>
			</v-row>
			<v-row>
				<puzzle-grid
					:columns="columns"
					:rows="rows"
					:scrambled="scrambled"
					:quote="quote"
					mode="edit"
					@update:letter-pool="syncLetterPool($event)"
					@update:quote="syncQuote($event)"
				/>
			</v-row>
			<v-row wrap>
				<v-btn
					block
					color="primary"
					dark
					type="submit"
					:disabled="!validPuzzle"
				>
					Save
				</v-btn>
			</v-row>
		</v-form>
	</v-container>
</template>

<script>
import { getUuid } from '@/utils';
import PuzzleGrid from '../components/PuzzleGrid.vue';

export default {
	components: {
		PuzzleGrid,
	},
	data: () => ({
		columns: 16,
		rows: 4,
		columnsList: [14, 15, 16, 17, 18],
		rowsList: [3, 4, 5, 6],
		validPuzzle: false,
		quote: '',
		scrambled: '',
	}),
	computed: {
		columnsCount() {
			return parseInt(this.columns, 10);
		},
		maxChars() {
			return this.rows * this.columns;
		},
		rules() {
			return {
				min: v =>
					(v && v.length >= this.maxChars) || `Must be ${this.maxChars} length`,
			};
		},
	},
	watch: {
		columns: {
			handler(newColumns) {
				this.quote = Array(this.rows * newColumns + 1).join('_');
				this.scrambled = Array(this.rows * newColumns + 1).join(' ');
			},
			immediate: true,
		},
		rows: {
			handler(newRows) {
				this.quote = Array(newRows * this.columns + 1).join('_');
				this.scrambled = Array(newRows * this.columns + 1).join(' ');
			},
			immediate: true,
		},
	},
	methods: {
		onlyLetters(evt) {
			const keyCode = evt.keyCode ? evt.keyCode : evt.which;

			if (keyCode < 97 || keyCode > 122) {
				evt.preventDefault();
			}
		},
		savePuzzle() {
			this.$store.dispatch('puzzles/add', {
				id: getUuid(),
				columns: this.columns,
				rows: this.rows,
				scrambled: this.scrambled,
				quote: this.quote,
			});
		},
		syncLetterPool(value) {
			this.scrambled = value;
		},
		syncQuote(value) {
			this.quote = value;
		},
	},
};
</script>
