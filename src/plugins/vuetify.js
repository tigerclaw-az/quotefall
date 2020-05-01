import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

import { dark, light } from './theme';

export default new Vuetify({
	icons: {
		iconfont: 'md',
	},
	theme: {
		dark: false,
		options: {
			customProperties: true,
		},
		themes: {
			dark,
			light,
		},
	},
});
