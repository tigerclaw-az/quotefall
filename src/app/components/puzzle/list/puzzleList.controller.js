export class PuzzleListController {
	constructor ($scope, $state, $log, allPuzzles, puzzleStore) {
		'ngInject';

		this.$scope = $scope;
		this.$log = $log;

		this.puzzleStore = puzzleStore;
		this.puzzles = this.puzzleStore.data.puzzles;

		this.$log.info('constructor()', this, $scope);
	}

	$onInit() {
		this.$log.info('$onInit()', this);
	}
}
