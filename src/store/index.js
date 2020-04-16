import Vue from 'vue';
import Vuex from 'vuex';

import modules from './modules';

Vue.use(Vuex);

const state = {};
const actions = {};
const mutations = {};

export default new Vuex.Store({
	strict: process.env.VUE_APP_STRICT || false,
	modules,
	state,
	actions,
	mutations,
});
