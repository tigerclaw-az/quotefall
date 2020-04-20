// import Vue from 'vue';
const MUTATION_TYPES = {
	ADD: 'ADD',
};

const state = {
	puzzles: [],
};

const getters = {
	getById: state => id => {
		const puzzle = state.puzzles.find(puzzle => puzzle.id === id);

		if (puzzle) {
			return puzzle;
		}

		return {};
	},
};

const actions = {
	async add({ commit, getters }, payload) {
		const existingPuzzle = await getters.getById(payload.id);

		if (!existingPuzzle.length) {
			commit(MUTATION_TYPES.ADD, payload);
		}
	},
};

const mutations = {
	[MUTATION_TYPES.ADD](state, payload) {
		state.puzzles = [...state.puzzles, payload];
	},
};

export default {
	namespaced: true,
	state,
	actions,
	getters,
	mutations,
};
