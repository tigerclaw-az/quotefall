export class PuzzleFormController {
	constructor($scope, $state, $log, utils, puzzleGridModel) {
		'ngInject';

		this.$state = $state;
		this.$log = $log;
		this.utils = utils;
		this.puzzleGridModel = puzzleGridModel;

		this.$log.info('contructor()', this);
	}

	setup(letters, numRows = 4) {
		this.$log.info('setup()', this);

		this.puzzleGridModel.newPuzzle(letters, numRows);
		this.$state.go('puzzle.edit', { id: 1 });
	}
}
