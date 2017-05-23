export function MainFooterDirective() {
	'ngInject';

	let directive = {
		bindToController: true,
		controller: MainFooterController,
		controllerAs: 'footer',
		replace: true,
		restrict: 'E',
		scope: true,
		templateUrl: 'app/main/footer/mainFooter.tpl.html'
	};

	return directive;
}

class MainFooterController {
	constructor () {
		'ngInject';
	}
}
