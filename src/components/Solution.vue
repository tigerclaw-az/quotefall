<template>
	<v-layout row justify-center no-gutters class="qf-solution-columns">
		<v-layout
			v-for="(col, colIndex) in solutionGrid"
			:key="`col-${colIndex}`"
			column
			class="qf-column"
		>
			<div
				v-for="(letter, rowIndex) in col"
				:key="`square-${rowIndex}`"
				class="qf-square"
				:class="{
					'qf-blank': isBlank(letter),
					'qf-available': isAvailable(rowIndex, colIndex),
				}"
				@click="
					updateSquare($event, {
						value: letter,
						row: rowIndex,
						column: colIndex,
					})
				"
			>
				<p v-if="!isBlank(letter)" class="qf-square-placeholder">
					{{ letter }}
				</p>
			</div>
		</v-layout>
	</v-layout>
</template>

<script>
export default {
	name: 'solution',
	props: {
		columns: {
			type: Number,
			default: 16,
		},
		rows: {
			type: Number,
			default: 4,
		},
		quote: {
			type: String,
			required: true,
		},
		mode: {
			type: String,
			default: 'solve',
		},
		letterSelected: {
			type: Object,
			default: () => ({}),
		},
	},
	data: () => ({
		solutionGrid: [],
	}),
	watch: {
		quote() {
			this.rebuildGrid();
		},
	},
	methods: {
		isAvailable(row, col) {
			if (this.letterSelected.column === col) {
				return true;
			}
		},
		isBlank(letter) {
			return letter === '-' || letter === ' ';
		},
		rebuildGrid() {
			const size = Math.ceil(this.quote.length / this.rows);
			const r = Array(size);
			let offset = 0;

			for (let i = 0; i < size; i++) {
				r[i] = this.quote.substr(offset, this.rows);
				offset += this.rows;
			}

			this.solutionGrid = r;
		},
		updateSquare(evt, square) {
			if (Object.keys(this.letterSelected).length === 0) {
				evt.preventDefault();

				return false;
			}

			const replace = this.solutionGrid[square.column].split('');

			replace[square.row] = this.letterSelected.value;
			this.solutionGrid.splice(square.column, 1, replace.join(''));

			this.$emit('used', square);
		},
	},
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';

.qf-square {
	line-height: 1.75;
	transition: background-color, opacity, transform 1s;

	&:not(.qf-blank) {
		opacity: 0.4;
	}

	&.qf-available:not(.qf-blank) {
		background-color: yellow;
		cursor: pointer;
		opacity: 1;

		&:hover {
			background-color: $letter-column-selected-color;
			transform: scale(1.2, 1.2);

			.qf-square-placeholder {
				transform: translateX(20px);
			}
		}
	}

	&.qf-blank {
		background-color: black;
	}

	.qf-square-placeholder {
		margin: 0;
	}
}
</style>
