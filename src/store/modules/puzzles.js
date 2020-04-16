// import Vue from 'vue';

const state = {
	puzzles: {},
};
const getters = {
	getById: state => id => {
		if (state.puzzles[id]) {
			return Promise.resolve(state.puzzles[id]);
		}

		// Return graphql query to get puzzle with "id"
	},
};
const actions = {
	create: (state, payload) => {
		// FIXME: Should be additive, not destructive
		state.puzzles = payload;
	},
};
const mutations = {};

export default {
	namespaced: true,
	state,
	actions,
	getters,
	mutations,
};
