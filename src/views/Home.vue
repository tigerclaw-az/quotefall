<template>
	<v-row>
		<!-- <v-col cols="12">
			<header>
				<h2 class="display-2">Puzzles</h2>
			</header>
		</v-col> -->
		<v-col cols="12">
			<v-list two-line dark subheader>
				<v-list-item v-for="puzzle in puzzles" :key="puzzle.id" :to="`/puzzles/${puzzle.id}`">
					<v-list-item-avatar>
						<v-icon>error</v-icon>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title>## by {{ puzzle.author }}</v-list-item-title>
						<v-list-item-subtitle>{{ puzzle.submitted }}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-col>
	</v-row>
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
