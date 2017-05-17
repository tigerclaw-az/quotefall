export class MainController {
	constructor ($scope, $state, $timeout, toastr) {
		'ngInject';

		this.$scope = $scope;
		this.$state = $state;
		this.toastr = toastr;

		this.activate($timeout);
	}

	activate($timeout) {
		$timeout(() => {
			this.classAnimation = 'rubberBand';
		}, 4000);
	}

	isRoute(name) {
		return this.$state.current.name === name;
	}
}
