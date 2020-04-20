<template>
	<div class="page-home">
		<h2>Puzzles</h2>
		<md-list v-for="puzzle in puzzles" :key="puzzle.id">
			<md-list-item :to="`/puzzles/${puzzle.id}`">
				<md-icon>error</md-icon>
				<span class="md-list-item-text">{{ puzzle.id }}</span>
			</md-list-item>
			<!-- <md-list-item to="/puzzles/1234">
				<md-icon>error</md-icon>
				<span class="md-list-item-text">#1234</span>
			</md-list-item> -->
		</md-list>
	</div>
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
