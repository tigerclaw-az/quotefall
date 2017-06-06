export class PuzzleListController {
	constructor ($scope, $state, $log, allPuzzles) {
		'ngInject';

		this.$scope = $scope;
		this.$log = $log;

		this.allPuzzles = allPuzzles;

		this.$log.info('constructor()', this, $scope);
	}

	$onInit() {
		this.$log.info('$onInit()', this);
	}
}
