<template>
	<v-layout row justify-center no-gutters class="qf-answer-grid">
		<template v-for="(row, rowIndex) in solutionGrid">
			<v-btn
				v-for="(square, colIndex) in row"
				:key="`square-${getPosition(rowIndex, colIndex)}`"
				:ripple="false"
				:outlined="!isBlank(square)"
				text
				class="qf-square"
				:class="{
					'qf-blank': isBlank(square),
					'qf-available': isAvailable(rowIndex, colIndex),
				}"
				:disabled="mode === 'solve' && !isAvailable(rowIndex, colIndex)"
				@click="
					updateSquare({
						value: square,
						row: rowIndex,
						column: colIndex,
					})
				"
			>
				<span class="qf-square-placeholder" :class="{ used: /[a-z]/.test(square) }">
					{{ square }}
				</span>
			</v-btn>
		</template>
	</v-layout>
</template>

<script>
export default {
	props: {
		columns: {
			type: Number,
			required: true,
		},
		rows: {
			type: Number,
			required: true,
		},
		quote: {
			type: [String, null],
			default: '',
		},
		mode: {
			type: String,
			required: true,
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
		quote: {
			handler() {
				if (this.quote) {
					this.rebuildGrid();
				}
			},
			immediate: true,
		},
	},
	methods: {
		getPosition(row, col) {
			return row * this.columns + col + 1;
		},
		isAvailable(row, col) {
			return Object.keys(this.letterSelected).length !== 0 && this.letterSelected.column === col;
		},
		isBlank(letter) {
			return letter === '-' || letter === ' ';
		},
		rebuildGrid() {
			const r = Array(this.rows);
			let offset = 0;

			for (let row = 0; row < this.rows; row++) {
				r[row] = this.quote.substr(offset, this.columns);
				offset += this.columns;
			}

			this.solutionGrid = r;
		},
		updateSquare(square) {
			const replace = this.solutionGrid[square.row].split('');

			if (this.mode === 'edit') {
				const quoteWithBlankSquare = Array.from(this.solutionGrid);

				// '-' => '_' , '_' => '-'
				replace[square.column] = this.isBlank(replace[square.column]) ? '_' : '-';
				quoteWithBlankSquare.splice(square.row, 1, replace.join(''));
				this.$parent.$emit('update:quote', quoteWithBlankSquare.join(''));
			} else {
				if (!this.isAvailable(square.row, square.column)) {
					return false;
				}

				replace[square.column] = this.letterSelected.value;
				this.solutionGrid.splice(square.row, 1, replace.join(''));
				this.$emit('used', square);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.qf-square {
	border: 1px solid $letter-column-border;
	font-size: 1.25rem;
	line-height: 1.75;
	transition: background-color, transform 0.75s;

	&.v-btn {
		border-color: inherit;
		min-width: #{$column-width}px;
		padding: 0;

		&:disabled {
			color: red !important;
		}
	}

	&.qf-available:not(.qf-blank) {
		background-color: yellow;
		cursor: pointer;
		opacity: 1;

		&:hover {
			background-color: $letter-column-selected-color;
			transform: scale(1.2, 1.2);

			.qf-square-placeholder {
				transform: rotateY(90deg);
			}
		}
	}

	&.qf-blank {
		background-color: black;
	}

	.qf-square-placeholder {
		margin: 0;
		transform: rotateY(90deg);
		transition: transform 1s;
		transition-delay: 0.5s;

		&.used {
			transform: rotateY(0deg);
		}
	}
}
</style>
