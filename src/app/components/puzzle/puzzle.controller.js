export class PuzzleController {
	constructor($scope, $state, $log) {
		'ngInject';

		this.$log = $log;
		this.$scope = $scope;
		this.$state = $state;
		this.$parent = $scope.$parent;

		this.mainCtrl = $scope.main;
		this.model = this.mainCtrl.puzzleModel;

		this.agModel = this.mainCtrl.answerGridModel;
		this.lcModel = this.mainCtrl.letterColumnsModel;
		$scope.puzzleModel = this.model;

		this.answerGrid = this.agModel.grid;
		this.letterColumns = this.lcModel.columns;

		this.$log.info('contructor()', this, $scope);
	}

	$onInit() {
		this.$scope.title = this.model.title;
		this.$scope.$on('$destroy', this.destroy());

		if (this.$state.params.id) {
			this.model.setupPuzzle(this.$state.params.id);
		}

		this.$log.info('$onInit()', this);
	}

	destroy() {
		return () => {
			this.$log.info('destroy', this);

			this.model.clear();
		};
	}
}
