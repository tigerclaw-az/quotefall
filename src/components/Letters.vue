<template>
	<div class="qf-letter-columns">
		<div
			class="qf-column"
			v-for="(row, rowIndex) in quoteSplit"
			:key="'row' + rowIndex"
		>
			<span
				class="qf-letter"
				v-for="(letter, index) in row"
				:key="'letter' + index"
			>
				<button>{{ letter }}</button>
			</span>
			<!-- <button
			class="qf-letter btn btn-default"
			ng-repeat="letter in column track by $index" ng-init="pos = col + letterColumnsCtrl.puzzleModel.columnSize * $index"
			ng-class="{
				selected: letterColumnsCtrl.selected.position == pos,
				used: letterColumnsCtrl.isLetterUsed(pos)
			}"
			ng-disabled="letter == ' ' || !letterColumnsCtrl.isClickable(pos)"
			ng-click="letterColumnsCtrl.onLetterClick($event, letter, col, $index, pos)"
		>{{letter}}</button> -->
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
		quote: {
			type: String,
			required: true,
		},
	},
	computed: {
		quoteSplit() {
			const size = Math.ceil(this.quote.length / this.rows);
			const r = Array(size);
			let offset = 0;

			for (let i = 0; i < size; i++) {
				r[i] = this.quote.substr(offset, this.rows);
				offset += this.rows;
			}

			return r;
		},
	},
};
</script>

<style lang="scss">
@import '~@/assets/variables';

$letter-column-border: 1px solid md-get-color-by-theme(light, text-primary) !default;
$letter-column-color: md-get-color-by-theme(dark, text-primary) !default;
$letter-column-font-size: rem-calc(28) !default;
$letter-column-selected-color: md-get-palette-color(green, 500);

.qf-letter-columns {
	border-bottom: $letter-column-border;
	display: flex;
	flex-flow: wrap;
	user-select: none;
	width: 100%;

	.qf-column {
		border: $letter-column-border;
		border-bottom: 0;
		flex: 0 1 auto;
		width: #{$column-width}em;

		.qf-letter {
			color: $letter-column-color;
			display: block;
			font-size: $letter-column-font-size;
			height: #{$letter-height / 2}em;
			padding: 0; // Override .btn
			position: relative;
			transition: color 0.4s linear;
			width: 100%;

			&[disabled] {
				color: md-theme-property(color, text-primary, background, 20);
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

			&.used {
				color: md-theme-property(color, text-primary, background, 40);

				&::after {
					transform: translateY(-50%) rotate(-25deg) scale(1);
				}
			}

			&.selected {
				background-color: $letter-column-selected-color;
			}
		}
	}
}
</style>
