describe('controllers', () => {
	let vm;

	beforeEach(angular.mock.module('quotefall'));

	beforeEach(inject(($controller) => {
		vm = $controller('MainController');
	}));

	it('function isRoute', () => {
		expect(vm.isRoute).not.toBeNull();
	});
});
