export class MainController {
	constructor ($scope, $location, $timeout, toastr) {
		'ngInject';

		this.$scope = $scope;
		this.$location = $location;
		this.toastr = toastr;

		this.$scope.routes = {
			home: '/',
			create: '/create',
			help: '/help'
		};

		this.activate($timeout);
	}

	activate($timeout) {
		$timeout(() => {
			this.classAnimation = 'rubberBand';
		}, 4000);
	}

	isRoute(name) {
		return this.$location.path() === name;
	}
}
