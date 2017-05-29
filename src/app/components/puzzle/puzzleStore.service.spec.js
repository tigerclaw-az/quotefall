describe('puzzleStore service', () => {
	beforeEach(angular.mock.module('quotefall'));

	it('should be registered', inject(puzzleStore => {
		expect(puzzleStore).not.toEqual(undefined);
	}));

	it('should have no puzzles', inject(puzzleStore => {
		expect(puzzleStore.puzzles).toEqual([]);
	}));

	describe('insert function', () => {
		it('should exist', inject(puzzleStore => {
			expect(puzzleStore.insert).not.toEqual(undefined);
		}));

		it('should create new puzzle', inject(puzzleStore => {
			puzzleStore.create('araoefaaleareofenunreseesyptozleq ot thlv  ut lus t   oly   z o ', 4);
			expect(puzzleStore.totalRows).toEqual(4);
			expect(puzzleStore.totalColumns).toEqual(16);
			expect(puzzleStore.size).toEqual(64);
		}));
	});
});
