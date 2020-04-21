import Vue from 'vue';

import Toasted from 'vue-toasted';
import VueLogger from 'vuejs-logger';

import { toast as toastConfig, logger as loggerConfig } from './config';

import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.use(Toasted, {
	router,
	...toastConfig,
});
Vue.use(VueLogger, loggerConfig);

Vue.config.productionTip = process.env.VUE_APP_DEBUG;

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
}).$mount('#app');
