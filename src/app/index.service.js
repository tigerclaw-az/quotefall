'use strict';

export class Utils {
	constructor() {
		'nginject';
	}

	getRandom(from, to) {
		return Math.random() * (to - from) + from;
	}
};
