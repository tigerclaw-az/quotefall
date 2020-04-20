<template>
	<div class="qf-solution-columns">
		<div
			class="qf-column"
			v-for="(col, colIndex) in solutionGrid"
			:key="`col-${colIndex}`"
		>
			<div
				class="qf-square"
				v-for="(letter, rowIndex) in col"
				:key="`square-${rowIndex}`"
				:class="{
					'qf-blank': isBlank(letter),
					'qf-available': isAvailable(rowIndex, colIndex),
				}"
				@click="updateSquare($event, rowIndex, colIndex)"
			>
				{{ letter }}
			</div>
		</div>
	</div>
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
	mounted() {
		const size = Math.ceil(this.quote.length / this.rows);
		const r = Array(size);
		let offset = 0;

		for (let i = 0; i < size; i++) {
			r[i] = this.quote.substr(offset, this.rows);
			offset += this.rows;
		}

		this.solutionGrid = r;
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
		updateSquare(evt, row, col) {
			if (Object.keys(this.letterSelected).length === 0) {
				evt.preventDefault();

				return false;
			}

			const replace = this.solutionGrid[col].split('');

			replace[row] = this.letterSelected.value;
			this.solutionGrid.splice(col, 1, replace.join(''));

			this.$emit('used');
		},
	},
};
</script>

<style lang="scss" scoped>
@import '~@/assets/variables';

.qf-square {
	line-height: 1.75;

	&.qf-available:not(.qf-blank) {
		background-color: md-get-palette-color(yellow, 400);
		cursor: pointer;

		&:hover {
			background-color: md-get-palette-color(green, 300);
		}
	}

	&.qf-blank {
		background-color: md-get-palette-color(black, 500);
	}
}
</style>
