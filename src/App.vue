<template>
	<div v-cloak id="app" class="page-container">
		<md-app md-waterfall>
			<md-app-toolbar class="md-primary md-large">
				<div class="md-toolbar-row">
					<md-button class="md-icon-button" @click="isMenuOpen = !isMenuOpen">
						<md-icon>menu</md-icon>
					</md-button>

					<span class="md-title">Quotefalls</span>
				</div>
			</md-app-toolbar>
			<md-app-drawer :md-active="isMenuOpen">
				<md-toolbar class="md-transparent" md-elevation="0">
					Navigation
				</md-toolbar>

				<md-list>
					<md-list-item>
						<md-icon>move_to_inbox</md-icon>
						<span class="md-list-item-text">Inbox</span>
					</md-list-item>

					<md-list-item>
						<md-icon>send</md-icon>
						<span class="md-list-item-text">Sent Mail</span>
					</md-list-item>

					<md-list-item>
						<md-icon>delete</md-icon>
						<span class="md-list-item-text">Trash</span>
					</md-list-item>

					<md-list-item>
						<md-icon>error</md-icon>
						<span class="md-list-item-text">Spam</span>
					</md-list-item>
				</md-list>
			</md-app-drawer>
			<md-app-content>
				<!-- <router-view /> -->
				<footer>Copyright (c) 2019</footer>
			</md-app-content>
		</md-app>
	</div>
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
