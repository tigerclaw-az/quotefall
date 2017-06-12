/* jscs:disable */

describe('puzzleModel service', () => {
	beforeEach(angular.mock.module('quotefall'));

	let pModel;

	beforeEach(inject((_puzzleModel_) => {
		pModel = _puzzleModel_;

		pModel.newPuzzle({
			difficulty: 1,
			letters: 'araoefaaleareofenunreseesyptozleq ot thlv  ut lus t   oly   z o ',
			numRows: 4,
			title: 'sample'
		});
	}));

	describe('newPuzzle()', () => {
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
			expect(pModel.id).toEqual(null);
			expect(pModel.title).toEqual('');
			expect(pModel.rowSize).toEqual(4);
			expect(pModel.columnSize).toEqual(0);
			expect(pModel.size).toEqual(0);
		});
	});
});
