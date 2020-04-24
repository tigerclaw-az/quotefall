<template>
	<v-navigation-drawer class="elevation-5" app dark clipped floating stateless :value="isMenuOpen">
		<!-- <v-toolbar dense>
				<v-toolbar-title>Navigation</v-toolbar-title>
			</v-toolbar> -->

		<v-list shaped>
			<v-list-item to="/" exact>
				<v-list-item-icon>
					<v-icon>archive</v-icon>
				</v-list-item-icon>
				<v-list-item-title class="v-list-item-text">Archives</v-list-item-title>
			</v-list-item>

			<v-list-item to="/puzzles/create" exact>
				<v-list-item-icon>
					<v-icon>send</v-icon>
				</v-list-item-icon>
				<v-list-item-title class="v-list-item-text">Create</v-list-item-title>
			</v-list-item>

			<v-list-item to="/help" exact>
				<v-list-item-icon>
					<v-icon>info</v-icon>
				</v-list-item-icon>
				<v-list-item-title class="v-list-item-text">Help</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
	computed: {
		isMenuOpen() {
			return this.$store.state.isMenuOpen;
		},
	},
};
</script>
