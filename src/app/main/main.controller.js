export class MainController {
	constructor ($scope, $timeout, toastr) {
		'ngInject';

		this.$scope = $scope;
		this.toastr = toastr;

		this.activate($timeout);
	}

	activate($timeout) {
		$timeout(() => {
			this.classAnimation = 'rubberBand';
		}, 4000);
	}
}
