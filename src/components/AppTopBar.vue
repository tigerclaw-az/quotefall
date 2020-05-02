<template>
	<v-app-bar app clipped-left :fade-img-on-scroll="true" prominent>
		<!-- <v-app-bar-nav-icon @click="toggleMenu()">
			<v-icon>menu</v-icon>
		</v-app-bar-nav-icon> -->

		<v-toolbar-title class="qf-title"><h1 class="display-4">Quotefalls</h1></v-toolbar-title>
		<v-subheader>"drop quotes"</v-subheader>
		<v-spacer></v-spacer>
		<v-list class="qf-navigation">
			<v-list-item to="/" exact>
				<v-list-item-title class="v-list-item-text">Archives</v-list-item-title>
			</v-list-item>

			<v-list-item to="/puzzles/create" exact>
				<v-list-item-title class="v-list-item-text">Create</v-list-item-title>
			</v-list-item>

			<v-list-item to="/help" exact>
				<v-list-item-title class="v-list-item-text">Help</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-app-bar>
</template>

<script>
export default {
	methods: {
		toggleMenu() {
			this.$store.commit('TOGGLE_MENU');
		},
	},
};
</script>

<style lang="scss" scoped>
.qf-navigation {
	display: flex;
}
</style>
