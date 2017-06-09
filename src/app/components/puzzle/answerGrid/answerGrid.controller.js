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
		var self = this;

		this.$scope.sl = this.puzzleModel.lcModel.selected;
		this.$scope.grid = this.agModel.grid;

		this.$rootScope.$on('letterColumns.update', ($event, data) => {
			self.$log.info('letterColumns.update', data);
			self.agModel.update('letter', data);
		});

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

	isSelectedInColumn(index) {
		return this.puzzleModel.isLetterSelectedInColumn(index);
	}

	onClickAnswerSquare($event, index) {
		let selectedLetter = this.puzzleModel.getSelectedLetter();

		this.$log.info('onClickAnswerSquare()', $event, index, selectedLetter);

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

		// Take focus off button when clicked
		$event.target.blur();
	}
};
