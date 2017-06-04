/* jscs:disable */

describe('utils service', () => {
	beforeEach(angular.mock.module('quotefall'));

	let utils;

	beforeEach(inject((_utils_) => {
		utils = _utils_;
	}));

	it('getRandom()', () => {
		let rnd = utils.getRandom(0, 5);

		expect(rnd > 0 && rnd < 5).toBeTruthy();
	});

	it('getRandomStr()', () => {
		let rnd = utils.getRandomStr(8);

		expect(rnd.match(/[\w\s]{8}/)).toBeTruthy();
	})

	it('getUuid() long', () => {
		let uuid = utils.getUuid();

		expect(uuid).toMatch(/[a-z\d]{8}-[a-z\d]{4}-4[a-z\d]{3}-[a-z\d]{4}-[a-z\d]{12}/);
	});
});
