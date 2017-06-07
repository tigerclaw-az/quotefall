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
		let options = {
			rows: [{
				name: '4',
				value: 4
			}, {
				name: '5',
				value: 5
			}, {
				name: '6',
				value: 6
			}],
			difficulty: this.puzzleModel.getDifficulty()
		};

		this.$log.info('onInit()', this);

		this.$scope.formOptions = options;
		this.$scope.numRows = options.rows[0];
		this.$scope.difficulty = options.difficulty[0];

		if (this.cfg.debug) {
			this.$scope.scrambledLetters = this.utils.getRandomStr(64);
			this.$scope.puzzleTitle = this.utils.getRandomStr(12);
		}
	}

	setup(data) {
		this.$log.info('setup()', this);

		this.puzzleModel.newPuzzle(data);
		this.$state.go('app.edit');
	}
}
