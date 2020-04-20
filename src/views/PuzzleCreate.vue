<template>
	<md-content class="md-accent">
		<div class="md-layout md-gutter">
			<div class="md-layout-item">
				<md-field>
					<label for="rows"># of Rows</label>
					<md-select v-model="rows" id="rows" name="rows" md-dense>
						<md-option value="3">3</md-option>
						<md-option value="4">4</md-option>
						<md-option value="5">5</md-option>
						<md-option value="6">6</md-option>
					</md-select>
				</md-field>
			</div>
			<div class="md-layout-item">
				<md-field>
					<label for="columns"># of Columns</label>
					<md-select id="columns" v-model="columns" name="columns" md-dense>
						<md-option value="14">14</md-option>
						<md-option value="15">15</md-option>
						<md-option value="16">16</md-option>
						<md-option value="17">17</md-option>
						<md-option value="18">18</md-option>
					</md-select>
				</md-field>
			</div>
		</div>
		<div class="md-layout md-gutter">
			<div class="md-layout-item">
				<md-field>
					<label for="quote">Scrambled</label>
					<md-input
						v-model="scrambled"
						:maxlength="rows * columns"
						pattern="\w+"
					/>
				</md-field>
			</div>
			<div class="md-layout-item">
				<md-field>
					<label for="quote">Solution</label>
					<md-input
						v-model="quote"
						:maxlength="rows * columns"
						pattern="[_-]+"
					/>
				</md-field>
			</div>
		</div>
		<div class="md-layout md-gutter">
			<div class="md-layout-item">
				<puzzle-grid
					:columns="columns"
					:rows="rows"
					:scrambled="scrambled"
					:quote="quote"
					mode="edit"
				/>
			</div>
		</div>
		<div class="md-layout md-gutter">
			<div class="md-layout-item">
				<button type="submit" class="md-button">Save</button>
			</div>
		</div>
	</md-content>
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
	}),
	computed: {
		columnsCount() {
			return parseInt(this.columns, 10);
		},
		emptyGrid() {
			return [
				new Array(this.columnsCount).fill(''),
				new Array(this.columnsCount).fill(''),
				new Array(this.columnsCount).fill(''),
				new Array(this.columnsCount).fill(''),
			];
		},
	},
};
</script>
