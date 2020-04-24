<template>
	<v-app>
		<v-navigation-drawer v-model="isMenuOpen" app clipped floating stateless class="elevation-5">
			<!-- <v-toolbar dense>
				<v-toolbar-title>Navigation</v-toolbar-title>
			</v-toolbar> -->

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

		<app-top-bar></app-top-bar>

		<v-content class="ml-2">
			<v-container fluid>
				<router-view />
				<app-footer></app-footer>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
import AppTopBar from '@/components/AppTopBar.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
	components: {
		AppTopBar,
		AppFooter,
	},
	computed: {
		isMenuOpen() {
			return this.$store.state.isMenuOpen;
		},
	},
};
</script>
<style lang="scss" src="./app.scss"></style>
