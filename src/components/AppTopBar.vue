<template>
	<v-app-bar app clipped-left dark>
		<v-app-bar-nav-icon @click="toggleMenu()">
			<v-icon>menu</v-icon>
		</v-app-bar-nav-icon>

		<v-toolbar-title class="v-title">Quotefalls</v-toolbar-title>
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
