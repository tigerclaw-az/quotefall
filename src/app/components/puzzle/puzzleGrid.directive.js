export function PuzzleGridDirective() {
	'ngInject';

	let directive = {
		bindToController: true,
		controller: PuzzleGridController,
		controllerAs: 'puzzleGrid',
		replace: true,
		restrict: 'E',
		scope: false,
		templateUrl: 'app/components/puzzle/puzzleGrid.tpl.html'
	};

	return directive;
}

class PuzzleGridController {
	constructor($scope, $log, $stateParams, utils, puzzleStore, puzzleGridModel, answerGridModel, letterColumnsModel) {
		'ngInject';

		this.$scope = $scope;
		this.$log = $log;
		this.$stateParams = $stateParams;

		this.$log.info('$scope', $scope);

		this.model = puzzleGridModel;
		this.puzzleStore = puzzleStore;
		this.agModel = answerGridModel;
		this.lcModel = letterColumnsModel;

		this.answerGrid = this.agModel.grid;
		this.letterColumns = this.lcModel.columns;

		this.utils = utils;
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
