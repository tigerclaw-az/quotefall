<template>
	<md-content class="md-accent">
		<span>Quote #{{ id }}</span>
		<h4>Difficulty: {{ difficulty }}</h4>
	</md-content>
</template>

<script>
export default {
	props: {
		// Comes from router config
		id: {
			type: String,
			required: true,
		},
	},
	data: () => ({
		difficulty: '',
	}),
};
</script>
