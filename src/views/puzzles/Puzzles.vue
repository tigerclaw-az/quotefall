<template>
	<v-layout row wrap align-center justify-center>
		<v-card color="accent">
			<v-card-title>Quote: {{ puzzle.id }}</v-card-title>
			<v-card-text>Difficulty: {{ puzzle.difficulty }}</v-card-text>
		</v-card>

		<PuzzleGrid
			v-if="puzzle.id"
			:columns="puzzle.columns"
			:rows="puzzle.rows"
			:scrambled="puzzle.scrambled"
			:quote="puzzle.quote"
		/>
	</v-layout>
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
	created() {
		if (!this.$store.state.puzzles.puzzles.length) {
			this.$router.push('/');
		}
	},
};
</script>
