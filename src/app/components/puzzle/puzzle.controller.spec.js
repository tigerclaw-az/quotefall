describe('puzzle controller', () => {
	beforeEach(angular.mock.module('quotefall'));

	let puzzle;

	beforeEach(inject(($rootScope, $controller, puzzleService) => {
		let scope = $rootScope.$new();

		puzzle = $controller('puzzleController', { $scope: scope });
	}));

	describe('savePuzzle()', () => {
		it('should exist', () => {
			expect(puzzle.savePuzzle).not.toBeNull();
		});
	});
});
