<template>
	<v-container align-center align-content-center d-flex fill-height fluid justify-center wrap>
		<v-list class="qf-choices">
			<v-list-item>
				<v-btn to="/puzzles/archives">Archives</v-btn>
			</v-list-item>
		</v-list>
	</v-container>
</template>

<script>
export default {
	props: {},
	data: () => ({}),
};
</script>

<style lang="scss" scoped>
>>> .row {
	max-width: 300px;
}
</style>
