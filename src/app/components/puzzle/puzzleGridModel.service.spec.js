/* jscs:disable */

describe('puzzleGridModel service', () => {
	beforeEach(angular.mock.module('quotefall'));

	let pgModel;

	it('should be registered', inject(puzzleGridModel => {
		expect(puzzleGridModel).not.toEqual(undefined);
	}));

	beforeEach(inject((_puzzleGridModel_) => {
		pgModel = _puzzleGridModel_;
	}));

	describe('newPuzzle()', () => {
		beforeEach(() => {
			pgModel.newPuzzle('araoefaaleareofenunreseesyptozleq ot thlv  ut lus t   oly   z o ', 4);
		});

		it('should have 4 rows', () => {
			expect(pgModel.totalRows).toEqual(4);
		});

		it('should have 16 rows', () => {
			expect(pgModel.totalColumns).toEqual(16);
		});

		it('should have grid size of 64', () => {
			expect(pgModel.size).toEqual(64);
		});
	});

	describe('clear()', () => {
		it('should exist', () => {
			expect(pgModel.clear).not.toEqual(undefined);
		});

		it('should clear puzzle data', () => {
			pgModel.clear();
			expect(pgModel.totalRows).toEqual(4);
			expect(pgModel.totalColumns).toEqual(0);
			expect(pgModel.size).toEqual(0);
		});
	});
});
