<template>
	<v-container fluid>
		<v-row align="center" justify="center">
			<v-col cols="12">
				<v-card color="secondary">
					<v-card-title>Quote: {{ puzzle.id }}</v-card-title>
					<v-card-text>Difficulty: {{ puzzle.difficulty }}</v-card-text>
				</v-card>
			</v-col>
			<v-spacer></v-spacer>
			<v-col cols="12">
				<PuzzleGrid
					v-if="puzzle.id"
					:columns="puzzle.columns"
					:rows="puzzle.rows"
					:scrambled="puzzle.scrambled"
					:quote="puzzle.quote"
				/>
			</v-col>
		</v-row>
	</v-container>
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
	mounted() {
		if (!this.$store.state.puzzles.puzzles.length) {
			this.$router.push('/');
		}
	},
};
</script>

<style lang="scss" scoped>
.row {
	height: 100%;
}
</style>
