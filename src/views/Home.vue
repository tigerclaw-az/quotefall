<template>
	<v-layout row wrap>
		<h2>Puzzles</h2>
		<v-list v-for="puzzle in puzzles" :key="puzzle.id">
			<v-list-item :to="`/puzzles/${puzzle.id}`">
				<v-icon>error</v-icon>
				<v-list-item-title>{{ puzzle.id }}</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-layout>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
	props: {},
	data: () => ({}),
	computed: {
		...mapState({
			puzzles: state => state.puzzles.puzzles,
		}),
	},
	mounted() {
		axios.get('./api/puzzles.json').then(response => {
			response.data.forEach(puzzle => {
				this.$store.dispatch('puzzles/add', puzzle);
			});
		});
	},
};
</script>
