<template>
	<v-container
		align="center"
		justify="center"
		class="qf-puzzle pa-0 text-center"
		:style="{ width: Math.round(39.25 * columns - 7) + 'px' }"
	>
		<letter-columns
			:columns="columns"
			:rows="rows"
			:scrambled="scrambled"
			:mode="mode"
			:letter-replaced="letterReplaced"
			:letter-selected.sync="letterSelected"
		/>
		<answer-grid
			:columns="columns"
			:rows="rows"
			:quote="quote"
			:mode="mode"
			:letter-selected="letterSelected"
			@used="onLetterUsed($event)"
		/>
	</v-container>
</template>

<script>
import LetterColumns from './LetterColumns.vue';
import AnswerGrid from './AnswerGrid.vue';

export default {
	components: {
		LetterColumns,
		AnswerGrid,
	},
	props: {
		columns: {
			type: Number,
			default: 16,
		},
		rows: {
			type: Number,
			default: 4,
		},
		scrambled: {
			type: [String, null],
			default: '',
		},
		quote: {
			type: [String, null],
			default: '',
		},
		mode: {
			type: String,
			default: 'solve',
		},
	},
	data: () => ({
		letterReplaced: {},
		letterSelected: {},
	}),
	methods: {
		onLetterUsed(square) {
			if (square.value.match(/[a-z]/g)) {
				this.letterReplaced = square;
			}

			this.letterSelected = {};
		},
	},
};
</script>

<style lang="scss">
.qf-puzzle {
	// border: 1px solid;
	@include elevation(10);
	flex: 0 auto;
	font-size: 1rem;
	height: 100%;
	max-width: 100%;
	padding: 0.75rem 4px;

	.qf-letter-columns,
	.qf-answer-grid {
		background-color: #fff;
		user-select: none;
		width: 100%;
		text-align: center;

		.qf-letter,
		.qf-square {
			position: relative;
			text-transform: capitalize;
			height: #{$column-width}px;
			min-width: #{$column-width}px;
			width: #{$column-width}px;
		}
	}
}
</style>
