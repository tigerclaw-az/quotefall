import { times } from 'lodash';

export function decode(str) {
	return window.atob(str);
}

export function encode(str) {
	return window.btoa(str);
}

export function random(from, to) {
	return Math.random() * (to - from) + from;
}

export function randomStr(num) {
	return times(num, () => {
		return String.fromCharCode(this.getRandom(96, 122));
	})
		.join('')
		.replace(/`/g, ' ');
}

export function getUuid(isShort = false) {
	let uuid = 'xxxxxxxx-xxxx-4xxx';

	if (!isShort) {
		uuid += '-yxxx-xxxxxxxxxxxx';
	}

	return uuid.replace(/[xy]/g, function(c) {
		const r = (Math.random() * 16) | 0,
			v = c === 'x' ? r : (r & 0x3) | 0x8;

		return v.toString(16);
	});
}
