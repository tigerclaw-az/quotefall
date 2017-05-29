/* jscs:disable */

describe('puzzleStore service', () => {
	beforeEach(angular.mock.module('quotefall'));

	let puzzleStore;

	beforeEach(inject((_puzzleStore_) => {
		puzzleStore = _puzzleStore_;
	}));

	it('should be registered', () => {
		expect(puzzleStore).not.toEqual(undefined);
	});

	it('should have no puzzles', () => {
		expect(puzzleStore.puzzles).toEqual([]);
	});

	describe('insert function', () => {
		it('should exist', inject(puzzleStore => {
			expect(puzzleStore.insert).not.toEqual(undefined);
		}));
	});
});
