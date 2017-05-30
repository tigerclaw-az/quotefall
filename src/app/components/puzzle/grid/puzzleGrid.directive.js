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
	constructor($scope, $log, $stateParams, puzzleModel) {
		'ngInject';

		this.$scope = $scope;
		this.$log = $log;
		this.$stateParams = $stateParams;

		this.main = $scope.main;

		this.$log.info('constructor()', this, $scope);

		this.model = puzzleModel;
		this.agModel = this.main.answerGridModel;
		this.lcModel = this.main.letterColumnsModel;

		this.answerGrid = this.agModel.grid;
		this.letterColumns = this.lcModel.columns;
	}

	$onInit() {
		this.$log.info('$onInit()', this);
		this.$scope.$on('$destroy', this.destroy());
	}

	destroy() {
		return () => {
			this.$log.info('destroy', this);

			this.model.clear();
		};
	}
}
