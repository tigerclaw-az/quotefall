export function LetterColumnsDirective() {
	'ngInject';

	let directive = {
		bindToController: true,
		controller: LetterColumnsController,
		controllerAs: 'letterColumnsCtrl',
		replace: true,
		restrict: 'E',
		scope: false,
		templateUrl: '/app/components/puzzle/letterColumns/letterColumns.tpl.html'
	};

	return directive;
}

class LetterColumnsController {
	constructor($scope, $log) {
		'ngInject';

		this.$scope = $scope;
		this.$log = $log;

		this.$scope.$on('$destroy', this.destroy());
	}

	destroy() {
		return () => {
			this.$log.info('destroy', this);
		};
	}
}
