<template>
	<div class="qf-letter-columns">
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
				<md-button
					:disabled="letter.value === ' '"
					@click="onSelected(letter, rowIndex, colIndex)"
				>
					{{ letter.value }}
				</md-button>
			</span>
		</div>
	</div>
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
		letterSelected: {
			type: Object,
		},
	},
	data: () => ({
		// letterSelected: -1,
		scrambledGrid: [],
	}),
	watch: {
		letterSelected(to, from) {
			if (Object.keys(to).length === 0) {
				// this.$log.debug(from);
				this.scrambledGrid[from.column].splice(from.row, 1, {
					...from,
					isUsed: true,
				});
			}
		},
	},
	mounted() {
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
	methods: {
		getPosition(row, col) {
			// 4 = num rows
			return row + col * 4 + 1;
		},
		onSelected(letter, row, column) {
			// this.letterSelected = this.getPosition(row, column);
			this.$emit('update:letterSelected', { ...letter, row, column });
		},
	},
};
</script>

<style lang="scss">
@import '~@/assets/variables';

.qf-letter {
	color: $letter-column-color;
	transition: color 0.4s linear;
	width: 100%;

	.md-button {
		font-size: inherit;
		height: inherit;
		margin: 0;
		min-width: inherit;
		width: 100%;

		&[disabled] {
			// @include md-theme-property(color, text-primary, accent);
			@include md-theme-property(background, primary);
		}

		.md-button-content {
			font-size: inherit;
		}
	}


	&::after {
		// border-bottom: 0;
		border-bottom: 0.125em solid md-get-palette-color(red, 500);
		bottom: 0.25rem;
		content: '';
		height: 0.25em;
		left: 0.25em;
		position: absolute;
		right: 0;
		transform: scaleX(0);
		transform-origin: 0% 50%;
		transition: transform 0.3s linear;
	}

	&.selected {
		background-color: $letter-column-selected-color;
	}

	&.used {
		color: md-theme-property(color, text-primary, background, 40);

		&::after {
			transform: translateY(-50%) rotate(-25deg) scale(1);
		}
	}
}
</style>
