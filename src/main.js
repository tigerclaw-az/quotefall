import Vue from 'vue';

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
// import 'vue-material/dist/theme/default-dark.css';

import Toasted from 'vue-toasted';
import VueLogger from 'vuejs-logger';

import { toast as toastConfig, logger as loggerConfig } from './config';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueMaterial);
Vue.use(Toasted, {
	router,
	...toastConfig,
});
Vue.use(VueLogger, loggerConfig);

Vue.config.productionTip = process.env.VUE_APP_DEBUG;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
