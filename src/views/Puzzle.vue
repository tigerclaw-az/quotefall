<template>
	<md-content>
		<md-card class="md-accent">
			<span>Quote: {{ puzzle.id }}</span>
			<h4>Difficulty: {{ puzzle.difficulty }}</h4>
		</md-card>

		<PuzzleGrid
			:columns="puzzle.columns"
			:rows="puzzle.rows"
			:scrambled="puzzle.scrambled"
			:quote="puzzle.quote"
		/>
	</md-content>
</template>

<script>
import PuzzleGrid from '@/components/PuzzleGrid.vue';

import { mapGetters } from 'vuex';
export default {
	components: {
		PuzzleGrid,
	},
	props: {
		// Comes from router config
		id: {
			type: String,
			required: true,
		},
	},
	data: () => ({}),
	computed: {
		...mapGetters({
			getPuzzle: 'puzzles/getById',
		}),
		puzzle() {
			return this.getPuzzle(this.id);
		},
	},
};
</script>
