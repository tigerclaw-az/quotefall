export function MainSidebarDirective() {
	'ngInject';

	let directive = {
		bindToController: true,
		controller: MainSidebarController,
		controllerAs: 'sidebar',
		replace: true,
		restrict: 'E',
		scope: true,
		templateUrl: 'app/main/sidebar/mainSidebar.tpl.html'
	};

	return directive;
}

class MainSidebarController {
	constructor () {
		'ngInject';
	}
}
