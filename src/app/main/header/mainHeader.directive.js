export function MainHeaderDirective() {
	'ngInject';

	let directive = {
		bindToController: true,
		controller: MainHeaderController,
		controllerAs: 'mh',
		replace: true,
		restrict: 'E',
		scope: false,
		templateUrl: 'app/main/header/mainHeader.tpl.html'
	};

	return directive;
}

class MainHeaderController {
	constructor () {
		'ngInject';
	}
}
