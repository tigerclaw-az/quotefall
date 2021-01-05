<template>
	<v-app>
		<app-top-bar></app-top-bar>

		<v-main>
			<v-container fill-height fluid class="container--app">
				<router-view />
			</v-container>
		</v-main>
		<app-footer></app-footer>
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
};
</script>
<style lang="scss" src="./app.scss"></style>
