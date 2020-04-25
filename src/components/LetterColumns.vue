<template>
	<v-layout row justify-center no-gutters class="qf-letter-columns">
		<template v-for="(row, rowIndex) in scrambledGrid">
			<span
				v-for="(letter, colIndex) in row"
				:key="`position-${letter.position}`"
				class="qf-letter"
				:class="{
					selected: letterSelected.position === letter.position,
					used: letter.isUsed,
				}"
			>
				<v-btn
					v-if="mode === 'solve'"
					:disabled="isLetterDisabled(letter)"
					:outlined="letterSelected.position === letter.position"
					@click="onSelected(letter, rowIndex, colIndex)"
				>
					{{ letter.value }}
				</v-btn>
				<v-text-field
					v-else
					v-model="scrambledGrid[rowIndex][colIndex].letter"
					autocomplete="off"
					dense
					:hide-details="true"
					maxlength="1"
					@keydown="letterOnly($event)"
					@keyup="nextInput($event)"
				/>
			</span>
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
		scrambled: {
			type: [String, null],
			default: '',
		},
		mode: {
			type: String,
			required: true,
		},
		letterReplaced: {
			type: Object,
		},
		letterSelected: {
			type: Object,
		},
	},
	data: () => ({
		moveNextLetter: false,
		scrambledGrid: [],
	}),
	watch: {
		letterReplaced(replaced) {
			this.$log.debug(replaced);
			const returnLetter = this.scrambledGrid.find(
				row => replaced.value === row[replaced.column].value
			)[replaced.column];

			this.updateLetterPool(returnLetter, false);
		},
		letterSelected(to, from) {
			if (Object.keys(to).length === 0) {
				this.updateLetterPool(from, true);
			}
		},
		scrambled: {
			handler() {
				this.rebuildGrid();
			},
			immediate: true,
		},
		scrambledGrid() {
			this.syncScrambled();
		},
	},
	methods: {
		getPosition(row, col) {
			return row * this.columns + col + 1;
		},
		isLetterDisabled(letter) {
			return letter.value === ' ' || letter.isUsed;
		},
		letterOnly(evt) {
			const keyCode = evt.keyCode ? evt.keyCode : evt.which;

			if (keyCode === 8 || keyCode === 37) {
				evt.target.value = '';
			} else if (keyCode !== 32 && (keyCode < 65 || keyCode > 90)) {
				evt.preventDefault();
			} else {
				this.moveNextLetter = true;
			}
		},
		nextInput(evt) {
			if (!this.moveNextLetter) {
				return false;
			}

			const target = evt.target;
			const topLevel = target.closest('.qf-letter');
			const sibling = topLevel.nextElementSibling;

			sibling.querySelector('input').focus();
			this.moveNextLetter = false;
		},
		syncScrambled() {
			const firstRow = this.scrambledGrid[0].map(letter => letter.letter || letter.value).join('');
			let letterPool = this.scrambledGrid.reduce((acc, cur, idx) => {
				let append = acc;

				if (idx === 1) {
					append = firstRow;
				}

				const letters = cur.map(letter => letter.letter || letter.value);

				return append + letters.join('');
			});

			if (this.scrambledGrid.length === 1) {
				letterPool = firstRow;
			}

			this.$parent.$emit('update:letter-pool', letterPool);
		},
		updateLetterPool(letter, isUsed) {
			this.scrambledGrid[letter.row].splice(letter.column, 1, {
				...letter,
				isUsed,
			});
		},
		rebuildGrid() {
			const r = Array(this.rows);
			let offset = 0;

			for (let row = 0; row < this.rows; row++) {
				r[row] = this.scrambled
					.substr(offset, this.columns)
					.split('')
					.map((value, index) => ({
						value,
						isUsed: false,
						position: this.getPosition(row, index),
					}));
				offset += this.columns;
			}

			this.scrambledGrid = r;
		},
		onSelected(letter, row, column) {
			// this.letterSelected = this.getPosition(row, column);
			this.$emit('update:letterSelected', { ...letter, row, column });
		},
	},
};
</script>

<style lang="scss">
.qf-letter-columns {
	border-top: $letter-column-border;

	.qf-letter {
		border: $letter-column-border;
		border-bottom: 0;
		border-top: 0;
		color: $letter-column-color;
		transition: color, opacity 0.5s linear;

		&::after {
			border-bottom: 0 solid red;
			bottom: 0.25rem;
			content: '';
			height: 0.25em;
			left: 0.25em;
			position: absolute;
			right: 0;
			transform: scaleX(0);
			transform-origin: 0% 50%;
			transition: border-bottom-width, transform 0.5s linear;
		}

		&.selected {
			.v-btn {
				background-color: $letter-column-selected-color;
			}
		}

		&.used {
			opacity: 0.6;

			&::after {
				border-bottom-width: 0.125em;
				transform: translateY(-50%) rotate(-25deg) scale(1);
			}
		}

		.v-btn {
			border-color: inherit;
			font-size: inherit;
			margin: 0;
			min-width: #{$column-width}px !important;
			padding: 0 !important;
		}

		.v-text-field {
			font-size: inherit;
			margin: 0;

			.v-input__slot {
				margin: 0;

				&::before,
				&::after {
					border-style: none;
				}

				input {
					text-align: center;
					text-transform: uppercase;
				}
			}
		}
	}
}
</style>
