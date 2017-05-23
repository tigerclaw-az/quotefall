import $log from '../../../shared/logger/es6-logger';

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
	constructor($scope) {
		'ngInject';

		this.$scope = $scope;
		this.$scope.$on('$destroy', this.destroy());
	}

	destroy() {
		return () => {
			$log.info('destroy', this);
		};
	}
}
