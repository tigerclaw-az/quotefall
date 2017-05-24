export function MainHeaderDirective() {
	'ngInject';

	let directive = {
		bindToController: true,
		controller: MainHeaderController,
		controllerAs: 'header',
		replace: true,
		restrict: 'E',
		scope: true,
		templateUrl: 'app/main/header/mainHeader.tpl.html'
	};

	return directive;
}

class MainHeaderController {
	constructor () {
		'ngInject';
	}

	$onInit() {

	}
}
