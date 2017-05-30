export class PuzzleController {
	constructor($scope, $log) {
		'ngInject';

		this.$log = $log;
		this.$scope = $scope;

		this.main = $scope.main;

		this.$log.info('contructor()', this, $scope);
	}

	$onInit() {
		this.$scope.title = this.main.puzzleModel.title;

		this.$log.info('$onInit()', this);
	}
}
