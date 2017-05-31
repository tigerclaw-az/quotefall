export class PuzzleListController {
	constructor ($scope, $state, $log, puzzleStore) {
		'ngInject';

		this.$scope = $scope;
		this.$log = $log;

		this.$log.info('constructor()', this, $scope);
	}

	$onInit() {
		this.$log.info('$onInit()', this);
	}
}
