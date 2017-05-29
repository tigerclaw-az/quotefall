'use strict';

export class Utils {
	constructor() {
		'nginject';
	}

	getRandom(from, to) {
		return Math.random() * (to - from) + from;
	}

	getUuid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);

			return v.toString(16);
		});
	}
};
