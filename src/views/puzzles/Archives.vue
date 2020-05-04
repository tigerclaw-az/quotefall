<template>
	<v-row align="center" justify="center">
		<v-col cols="12">
			<v-list class="qf-puzzles-list" two-line subheader>
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
import { mapState } from 'vuex';

export default {
	computed: {
		...mapState({
			puzzles: state => state.puzzles.puzzles,
		}),
	},
};
</script>

<style lang="scss" scoped>
.row {
	height: 100%;
}
</style>
