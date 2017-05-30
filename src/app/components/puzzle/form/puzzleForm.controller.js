export class PuzzleFormController {
	constructor($scope, $state, $log, utils, puzzleModel) {
		'ngInject';

		this.$state = $state;
		this.$log = $log;
		this.utils = utils;
		this.puzzleModel = puzzleModel;

		this.$log.info('contructor()', this);
	}

	setup(letters, title, numRows = 4) {
		this.$log.info('setup()', this);

		this.puzzleModel.newPuzzle(letters, numRows, title);
		this.$state.go('puzzle.edit', { id: 1 });
	}
}
