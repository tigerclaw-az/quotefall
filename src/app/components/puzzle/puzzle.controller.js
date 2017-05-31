export class PuzzleController {
	constructor($scope, $state, $log) {
		'ngInject';

		this.$log = $log;
		this.$scope = $scope;
		this.$state = $state;
		this.$parent = $scope.$parent;

		this.mainCtrl = $scope.main;
		this.model = $scope.main.puzzleModel;

		this.$log.info('contructor()', this, $scope);
		this.agModel = this.mainCtrl.answerGridModel;
		this.lcModel = this.mainCtrl.letterColumnsModel;

		this.answerGrid = this.agModel.grid;
		this.letterColumns = this.lcModel.columns;
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

	save() {
		this.$parent.puzzleStore.insert();
		this.$state.go('app.list');
	}
}
