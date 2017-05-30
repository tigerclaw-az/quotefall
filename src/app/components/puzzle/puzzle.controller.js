export class PuzzleController {
	constructor($scope, $log) {
		'ngInject';

		this.$log = $log;
		this.$scope = $scope;

		this.main = $scope.main;
		this.model = this.main.puzzleModel;

		this.agModel = this.main.answerGridModel;
		this.lcModel = this.main.letterColumnsModel;

		this.answerGrid = this.agModel.grid;
		this.letterColumns = this.lcModel.columns;

		this.$log.info('contructor()', this, $scope);
	}

	$onInit() {
		this.$scope.title = this.model.title;
		this.$scope.$on('$destroy', this.destroy());

		this.$log.info('$onInit()', this);
	}

	destroy() {
		return () => {
			this.$log.info('destroy', this);

			this.model.clear();
		};
	}
}
