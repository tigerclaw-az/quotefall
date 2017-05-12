export class MainController {
	constructor ($timeout, toastr) {
		'ngInject';

		this.height = 50;
		this.width = 50;
		this.rows = 4;

		this.toastr = toastr;

		this.activate($timeout);
	}

	activate($timeout) {
		$timeout(() => {
			this.classAnimation = 'rubberBand';
		}, 4000);
	}
}
