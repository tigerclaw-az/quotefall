<template>
	<div
		class="qf-puzzle-container text-center"
		:style="{ width: columns * 56 + 'px' }"
	>
		<section class="qf-puzzle">
			<letters :columns="columns" :rows="rows" :quote="quote" />
			<solution :columns="columns" :rows="rows" :layout="layout" />
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
		quote: {
			type: String,
			required: true,
		},
		layout: {
			type: String,
			default: '',
		},
	},
};
</script>

<style lang="scss">
@import '~@/assets/variables';
$puzzle-background: md-get-palette-color(green, 200);

.qf-puzzle {
	background-color: $puzzle-background;
	color: md-get-palette-color(black, 200);

	.qf-column {
		// float: left;
		text-align: center;
	}
}
</style>
