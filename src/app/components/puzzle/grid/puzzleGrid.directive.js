export function PuzzleGridDirective() {
	'ngInject';

	let directive = {
		bindToController: true,
		controller: PuzzleGridController,
		controllerAs: 'puzzleGrid',
		replace: true,
		restrict: 'E',
		scope: false,
		templateUrl: 'app/components/puzzle/grid/puzzleGrid.tpl.html'
	};

	return directive;
}

class PuzzleGridController {
	constructor($scope, $log, $stateParams) {
		'ngInject';

		this.$scope = $scope;
		this.$log = $log;
		this.$stateParams = $stateParams;

		this.main = $scope.main;

		this.$log.info('constructor()', this, $scope);
	}

	$onInit() {
		this.$log.info('$onInit()', this);
		this.$scope.$on('$destroy', this.destroy());
	}

	destroy() {
		return () => {
			this.$log.info('destroy', this);
		};
	}
}
