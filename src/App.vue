<template>
	<v-app>
		<v-app-bar app dark>
			<v-app-bar-nav-icon @click="isMenuOpen = !isMenuOpen">
				<v-icon>menu</v-icon>
			</v-app-bar-nav-icon>

			<v-toolbar-title class="v-title">Quotefalls</v-toolbar-title>
		</v-app-bar>
		<v-navigation-drawer v-model="isMenuOpen" absolute temporary>
			<v-toolbar dense>
				<v-toolbar-title>Navigation</v-toolbar-title>
			</v-toolbar>

			<v-list>
				<v-list-item to="/" exact>
					<v-list-item-icon>
						<v-icon>move_to_inbox</v-icon>
					</v-list-item-icon>
					<v-list-item-title class="v-list-item-text">Home</v-list-item-title>
				</v-list-item>

				<v-list-item to="/puzzles/create">
					<v-list-item-icon>
						<v-icon>send</v-icon>
					</v-list-item-icon>
					<v-list-item-title class="v-list-item-text">Create</v-list-item-title>
				</v-list-item>

				<v-list-item>
					<v-list-item-icon>
						<v-icon>delete</v-icon>
					</v-list-item-icon>
					<v-list-item-title class="v-list-item-text">Trash</v-list-item-title>
				</v-list-item>

				<v-list-item>
					<v-list-item-icon>
						<v-icon>error</v-icon>
					</v-list-item-icon>
					<v-list-item-title class="v-list-item-text">Spam</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-content>
			<v-container fluid>
				<router-view />
				<footer>Copyright (c) 2019</footer>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
export default {
	components: {},
	data: () => ({
		isMenuOpen: false,
	}),
};
</script>
<style lang="scss" src="./app.scss"></style>
