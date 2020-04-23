<template>
	<v-container
		align-center
		justify-center
		wrap
		class="qf-puzzle white text-center"
		:style="{ width: Math.round(39.25 * columns - 7) + 'px' }"
	>
		<letters
			:columns="columns"
			:rows="rows"
			:scrambled="scrambled"
			:mode="mode"
			:letter-replaced="letterReplaced"
			:letter-selected.sync="letterSelected"
		/>
		<solution
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
import Letters from './Letters.vue';
import Solution from './Solution.vue';

export default {
	name: 'puzzle-grid',
	components: {
		Letters,
		Solution,
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
@import '~@/styles/variables';

.qf-puzzle {
	border: 1px solid;
	@include elevation(10);
	// box-shadow: 0px 10px 15px 1px;
	color: black;
	flex: 0 auto;
	font-size: 1rem;
	max-width: 100%;
	padding: 0.75rem 4px;

	.qf-letter-columns,
	.qf-solution-columns {
		user-select: none;
		width: 100%;

		background-color: $puzzle-background;
		text-align: center;

		.qf-letter,
		.qf-square {
			position: relative;
			text-transform: capitalize;
			width: #{$column-width}px;
		}

		.qf-letter {
			border: $letter-column-border;
			border-bottom: 0;
			border-top: 0;

			.qf-square {
				border: 1px solid $letter-column-border;
			}
		}
	}
}
</style>
