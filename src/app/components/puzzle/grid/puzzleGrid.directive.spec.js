/* jscs:disable */

describe('puzzleGrid directive', () => {
	let vm,
		element,
		$compile,
		$rootScope,
		$scope;

	beforeEach(angular.mock.module('quotefall'));

	beforeEach(inject((_$compile_, _$rootScope_, _$controller_) => {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new({});

		element = angular.element(`
			<puzzle-grid></puzzle-grid>
		`);

		// FIXME: Determine how to test directive in isolation, without 'main' parent
		// https://demisx.github.io/angularjs/unit-testing/2014/10/28/unit-testing-angular-child-directive-that-requires-parent.html
		//

		// $compile(element)($rootScope);
		// $rootScope.$digest();
		// vm = element.children().isolateScope();
	}));

	it('should be compiled', () => {
		expect(element.html()).not.toEqual(null);
	});
});
