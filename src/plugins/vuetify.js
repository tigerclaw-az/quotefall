import Vue from 'vue';
import Vuetify from 'vuetify/lib';

// import 'material-design-icons-iconfont/dist/material-design-icons.css'; // Ensure you are using css-loader

Vue.use(Vuetify);

export default new Vuetify({
	icons: {
		iconfont: 'md',
	},
	theme: {
		themes: {
			light: {
				primary: '#ee44aa',
				secondary: '#82B1FF',
				// accent: '#82B1FF',
				// error: '#FF5252',
				// info: '#2196F3',
				// success: '#4CAF50',
				// warning: '#FFC107',
			},
		},
	},
});
