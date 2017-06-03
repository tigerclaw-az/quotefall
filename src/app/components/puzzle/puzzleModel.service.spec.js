/* jscs:disable */

describe('puzzleModel service', () => {
	beforeEach(angular.mock.module('quotefall'));

	let pModel;

	it('should be registered', inject(puzzleModel => {
		expect(puzzleModel).not.toEqual(undefined);
	}));

	beforeEach(inject((_puzzleModel_) => {
		pModel = _puzzleModel_;
	}));

	describe('newPuzzle()', () => {
		beforeEach(() => {
			pModel.newPuzzle('araoefaaleareofenunreseesyptozleq ot thlv  ut lus t   oly   z o ', 4);
		});

		it('should have 4 rows', () => {
			expect(pModel.rowSize).toEqual(4);
		});

		it('should have 16 rows', () => {
			expect(pModel.columnSize).toEqual(16);
		});

		it('should have grid size of 64', () => {
			expect(pModel.size).toEqual(64);
		});
	});

	describe('clear()', () => {
		it('should exist', () => {
			expect(pModel.clear).not.toEqual(undefined);
		});

		it('should clear puzzle data', () => {
			pModel.clear();
			expect(pModel.totalRows).toEqual(4);
			expect(pModel.totalColumns).toEqual(0);
			expect(pModel.size).toEqual(0);
		});
	});
});
