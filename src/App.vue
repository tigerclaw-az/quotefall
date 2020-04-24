<template>
	<v-app>
		<app-sidebar></app-sidebar>

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
import AppSidebar from '@/components/AppSidebar.vue';

export default {
	components: {
		AppTopBar,
		AppFooter,
		AppSidebar,
	},
};
</script>
<style lang="scss" src="./app.scss"></style>
