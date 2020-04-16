<template>
	<div>SOLUTION</div>
</template>

<script>
export default {
	name: 'solution',
	props: {
		columns: {
			type: Number,
			default: 16,
		},
		rows: {
			type: Number,
			default: 4,
		},
		layout: {
			type: String,
			required: true,
		},
	},
};
</script>
