<template>
	<v-app-bar app clipped-left :fade-img-on-scroll="true" prominent>
		<v-app-bar-nav-icon @click="toggleMenu()">
			<v-icon>menu</v-icon>
		</v-app-bar-nav-icon>

		<v-toolbar-title class="qf-title"><h1 class="display-4">Quotefalls</h1></v-toolbar-title>
		<v-subheader>"drop quotes"</v-subheader>
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
</style>
