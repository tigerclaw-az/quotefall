export class PuzzleFormController {
	constructor($scope, $state, $log, appConfig, utils, puzzleModel) {
		'ngInject';

		this.$scope = $scope;
		this.$state = $state;
		this.$log = $log;

		this.cfg = appConfig;
		this.utils = utils;
		this.puzzleModel = puzzleModel;

		this.$log.info('contructor()', this, $scope);
	}

	$onInit() {
		this.$log.info('onInit()', this);

		if (this.cfg.debug) {
			this.$scope.scrambledLetters = this.utils.getRandomStr(64);
			this.$scope.puzzleTitle = this.utils.getRandomStr(12);
		}
	}

	setup(letters, title, numRows = 4) {
		this.$log.info('setup()', this);

		this.puzzleModel.newPuzzle(letters, numRows, title);
		this.$state.go('app.edit');
	}
}
