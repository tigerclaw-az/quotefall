<template>
	<v-container align-center align-content-center d-flex fill-height fluid justify-center wrap>
		<v-list class="qf-choices">
			<v-list-item>
				<v-btn to="/puzzles/archives">Archives</v-btn>
			</v-list-item>
		</v-list>
	</v-container>
</template>

<script>
import axios from 'axios';

export default {
	props: {},
	data: () => ({}),

	mounted() {
		axios.get('./api/puzzles.json').then(response => {
			this.$log.debug(response);
			response.data.forEach(puzzle => {
				this.$store.dispatch('puzzles/add', puzzle);
			});
		});
	},
};
</script>

<style lang="scss" scoped>
>>> .row {
	max-width: 300px;
}
</style>
