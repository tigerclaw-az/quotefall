export
default class AnswerGridController {
	constructor($rootScope, $scope, $log, answerGridModel, puzzleModel) {
		'ngInject';

		this.$rootScope = $rootScope;
		this.$scope = $scope;
		this.$log = $log;

		this.agModel = answerGridModel;
		this.puzzleModel = puzzleModel;

		this.$log.info('constructor()', this);
	}

	$onInit() {
		this.$scope.sl = this.puzzleModel.lcModel.selected;
		this.$scope.grid = this.agModel.grid;

		this.$log.info('$onInit()', this);
	}

	$onChanges(obj) {
		this.$log.info('$onChanges()', this, obj);
	}

	$onDestroy() {
		return () => {
			this.$log.info('destroy', this);
		};
	}

	onClickAnswerSquare(index) {
		let selectedLetter = this.puzzleModel.getSelectedLetter();

		this.$log.info('onClickAnswerSquare()', index);

		if (this.puzzleModel.id) {
			this.agModel.update('letter', {
				letter: selectedLetter.letter,
				index: index,
				lcPosition: selectedLetter.position
			});

			this.$rootScope.$emit('answerGrid.update', {});
		} else {
			this.agModel.update('reserved', {
				index: index
			});
		}
	}
};
