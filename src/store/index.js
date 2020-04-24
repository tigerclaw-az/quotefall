import Vue from 'vue';
import Vuex from 'vuex';

import modules from './modules';

Vue.use(Vuex);

const MUTATION_TYPES = {
	TOGGLE_MENU: 'TOGGLE_MENU',
};

const state = {
	isMenuOpen: true,
};
const actions = {};
const mutations = {
	[MUTATION_TYPES.TOGGLE_MENU](state) {
		state.isMenuOpen = !state.isMenuOpen;
	},
};

export default new Vuex.Store({
	strict: process.env.VUE_APP_STRICT || false,
	modules,
	state,
	actions,
	mutations,
});
