<template>
	<v-container align-center justify-center wrap class="qf-puzzle text-center">
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
			type: String,
			required: true,
		},
		quote: {
			type: String,
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
	background-color: $puzzle-background;
	box-shadow: 0px 10px 15px 1px;
	color: black;
	flex: 0 auto;
	width: auto;

	.qf-letter-columns,
	.qf-solution-columns {
		flex-flow: nowrap;
		user-select: none;
		width: 100%;

		.qf-column {
			background-color: $puzzle-background;
			flex: 0 1 auto;
			text-align: center;
			width: #{$column-width}em;

			.qf-letter,
			.qf-square {
				border: $letter-column-border;
				display: block;
				font-size: $letter-font-size;
				height: #{$letter-height / 2}em;
				position: relative;
				text-transform: capitalize;
			}

			.qf-letter {
				border-bottom: 0;

				&:not(:first-child) {
					border-top: 0;
				}
			}

			.qf-square {
				border: 1px solid $letter-column-border;
			}
		}
	}
}
</style>
