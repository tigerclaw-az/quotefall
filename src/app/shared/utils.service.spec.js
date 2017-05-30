/* jscs:disable */

describe('utils service', () => {
	beforeEach(angular.mock.module('quotefall'));

	let utils;

	beforeEach(inject((_utils_) => {
		utils = _utils_;
	}));

	it('should have getRandom()', () => {
		let rnd = utils.getRandom(0, 5);

		expect(rnd > 0 && rnd < 5).toBeTruthy();
	});

	it('should have getUuid()', () => {
		let uuid = utils.getUuid();

		expect(uuid).toMatch(/[a-z\d]{8}-[a-z\d]{4}-4[a-z\d]{3}-[a-z\d]{4}-[a-z\d]{12}/);
	});
});
