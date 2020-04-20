<template>
	<div
		class="qf-puzzle-container text-center"
		:style="{ width: columns * 56 + 'px' }"
	>
		<section class="qf-puzzle">
			<letters
				:columns="columns"
				:rows="rows"
				:scrambled="scrambled"
				:mode="mode"
				:letterSelected.sync="letterSelected"
			/>
			<solution
				:columns="columns"
				:rows="rows"
				:quote="quote"
				:mode="mode"
				:letter-selected="letterSelected"
				@used="onLetterUsed()"
			/>
		</section>
	</div>
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
		letterSelected: {},
	}),
	methods: {
		onLetterUsed() {
			// this.letterUsed = true;
			this.letterSelected = {};
		},
	},
};
</script>

<style lang="scss">
@import '~@/assets/variables';

.qf-puzzle {
	background-color: $puzzle-background;
	color: md-get-palette-color(black, 200);

	.qf-letter-columns,
	.qf-solution-columns {
		border-bottom: $letter-column-border;
		display: flex;
		flex-flow: wrap;
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
