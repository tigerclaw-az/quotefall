'use strict';

export class UtilsService {
	constructor($log) {
		'ngInject';

		this.$log = $log;

		this.$log.info('constructor()', this);
	}

	decode(str) {
		return window.atob(str);
	}

	encode(str) {
		return window.btoa(str);
	}

	getRandom(from, to) {
		return Math.random() * (to - from) + from;
	}

	getUuid(isShort = false) {
		let uuid = 'xxxxxxxx-xxxx-4xxx';

		if (!isShort) {
			uuid += '-yxxx-xxxxxxxxxxxx';
		}

		return uuid.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);

			return v.toString(16);
		});
	}
};
