/* jscs:disable */

describe('answerGridModel service', () => {
	beforeEach(angular.mock.module('quotefall'));

	let agModel;

	it('should be registered', inject(answerGridModel => {
		expect(answerGridModel).not.toEqual(undefined);
	}));

	beforeEach(inject((_answerGridModel_) => {
		agModel = _answerGridModel_;
	}));

	describe('init', () => {
		beforeEach(() => {
			agModel.init(64);
		});

		it('should create empty grid', () => {
			expect(agModel.grid.length).toEqual(64);
		});

		it('should have different objects', () => {
			expect(agModel.grid[0]).not.toEqual(agModel.grid[1]);
		});
	});
});
