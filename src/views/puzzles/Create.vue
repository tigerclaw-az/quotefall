<template>
	<v-container fluid>
		<v-form @submit.prevent="createPuzzle()">
			<v-row>
				<v-col cols="6" md="3">
					<v-text-field v-model="author" required name="author" label="Author" single-line></v-text-field>
				</v-col>
				<v-col cols="6" md="3">
					<v-select
						v-model="difficultyLevel"
						label="Difficulty"
						:items="difficultyList"
						hint="Choose difficulty level"
						persistent-hint
					></v-select>
				</v-col>
				<v-col cols="6" md="3">
					<v-select
						v-model="rows"
						label="# of Rows"
						:items="rowsList"
						hint="Choose number of rows for this puzzle"
						persistent-hint
					></v-select>
				</v-col>
				<v-col cols="6" md="3">
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
			<v-row>
				<v-btn color="primary" type="submit" :disabled="!validPuzzle">
					Create
				</v-btn>
			</v-row>
		</v-form>
		<v-snackbar v-model="success" color="success" :multiLine="true">
			New Puzzle Created
			{{ puzzleData }}
		</v-snackbar>
		<v-snackbar v-model="error" color="error" :multiLine="true" :timeout="0">
			{{ error }}
			<v-btn flat @click.native="value = false">Close</v-btn>
		</v-snackbar>
	</v-container>
</template>

<script>
import { getUuid } from '@/utils';
import PuzzleGrid from '@/components/PuzzleGrid.vue';

export default {
	components: {
		PuzzleGrid,
	},
	data: () => ({
		author: '',
		columns: 16,
		rows: 4,
		difficultyList: [
			{
				key: 1,
				text: 'Easy',
			},
			{
				key: 2,
				text: 'Hard',
			},
			{
				key: 3,
				text: 'Challenging',
			},
		],
		columnsList: [10, 12, 15, 16, 17, 18, 19],
		rowsList: [2, 3, 4, 5],
		validPuzzle: false,
		difficultyLevel: { key: 1, text: 'Easy' },
		quote: '',
		scrambled: '',
		error: null,
		success: false,
		puzzleId: getUuid(),
	}),
	computed: {
		columnsCount() {
			return parseInt(this.columns, 10);
		},
		maxChars() {
			return this.rows * this.columns;
		},
		puzzleData() {
			return {
				id: this.puzzleId,
				author: this.author,
				difficulty: this.difficultyLevel.key,
				columns: this.columns,
				rows: this.rows,
				quote: this.quote,
				scrambled: this.scrambled,
				submitted: new Date().toLocaleDateString(),
			};
		},
		rules() {
			return {
				min: v => (v && v.length >= this.maxChars) || `Must be ${this.maxChars} length`,
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
		puzzleData: {
			handler(val) {
				if (val.scrambled.length === this.maxChars && val.quote.length === this.maxChars) {
					const numSpaces = this.scrambled.split(' ').length;
					const numBlanks = this.quote.split('-').length;

					this.validPuzzle = numSpaces > 1 && numSpaces === numBlanks;
				}
			},
			deep: true,
		},
	},
	methods: {
		onlyLetters(evt) {
			const keyCode = evt.keyCode ? evt.keyCode : evt.which;

			if (keyCode < 97 || keyCode > 122) {
				evt.preventDefault();
			}
		},
		createPuzzle() {
			this.$store
				.dispatch('puzzles/add', this.puzzleData)
				.then(() => {
					this.success = true;
					this.$log.info(JSON.stringify(this.puzzleData));

					setTimeout(() => {
						this.$router.push('/');
					}, 2000);
				})
				.catch(err => {
					this.error = err;
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
