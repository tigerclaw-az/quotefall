/* jscs:disable */

describe('main controller', () => {
	let ctrl,
		scope;

	beforeEach(angular.mock.module('quotefall'));

	beforeEach(inject(($rootScope, $controller) => {
		scope = $rootScope.$new();
		ctrl = $controller('mainController', {
			'$scope': scope
		});
	}));

	it('should have puzzleStore', () => {
		expect(scope.puzzleStore).not.toBeNull();
	});
});
