<template>
	<v-layout row justify-center no-gutters class="qf-letter-columns">
		<div
			v-for="(columnLetters, colIndex) in scrambledGrid"
			:key="`col-${colIndex}`"
			class="qf-column"
		>
			<span
				v-for="(letter, rowIndex) in columnLetters"
				:key="`position-${rowIndex}`"
				class="qf-letter"
				:class="{
					selected: letterSelected.position === letter.position,
					used: letter.isUsed,
				}"
			>
				<v-btn
					block
					:disabled="isLetterDisabled(letter)"
					:outlined="letterSelected.position === letter.position"
					@click="onSelected(letter, rowIndex, colIndex)"
				>
					{{ letter.value }}
				</v-btn>
			</span>
		</div>
	</v-layout>
</template>

<script>
export default {
	name: 'letters',
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
		mode: {
			type: String,
			default: 'solve',
		},
		letterReplaced: {
			type: Object,
		},
		letterSelected: {
			type: Object,
		},
	},
	data: () => ({
		// letterSelected: -1,
		scrambledGrid: [],
	}),
	watch: {
		letterReplaced(replaced) {
			const returnLetter = this.scrambledGrid[replaced.column].find(
				letters => replaced.value === letters.value
			);

			this.updateLetterPool(returnLetter, false);
		},
		letterSelected(to, from) {
			if (Object.keys(to).length === 0) {
				// this.$log.debug(from);
				this.updateLetterPool(from, true);
			}
		},
		scrambled() {
			this.rebuildGrid();
		},
	},
	methods: {
		getPosition(row, col) {
			// 4 = num rows
			return row + col * this.rows + 1;
		},
		isLetterDisabled(letter) {
			return letter.value === ' ' || letter.isUsed;
		},
		updateLetterPool(letter, isUsed) {
			this.scrambledGrid[letter.column].splice(letter.row, 1, {
				...letter,
				isUsed,
			});
		},
		rebuildGrid() {
			const size = Math.ceil(this.scrambled.length / this.rows);
			const r = Array(size);
			let offset = 0;

			for (let col = 0; col < size; col++) {
				r[col] = this.scrambled
					.substr(offset, this.rows)
					.split('')
					.map((value, index) => ({
						value,
						isUsed: false,
						position: this.getPosition(index, col),
					}));
				offset += this.rows;
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
@import '~@/styles/variables';

.qf-letter {
	color: $letter-column-color;
	transition: color, opacity 0.5s linear;
	width: 100%;

	.v-btn {
		border-radius: 0;
		font-size: inherit;
		height: inherit;
		margin: 0;
		padding: 0 !important;
	}

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
}
</style>
