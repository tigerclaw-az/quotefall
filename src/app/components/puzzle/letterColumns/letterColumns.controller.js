export
default class LetterColumnsController {
	constructor($rootScope, $scope, $log, letterColumnsModel, puzzleModel) {
		'ngInject';

		this.$rootScope = $rootScope;
		this.$scope = $scope;
		this.$parent = this.$scope.$parent;
		this.$log = $log;

		this.lcModel = letterColumnsModel;
		this.puzzleModel = puzzleModel;

		this.$log.info('constructor()', this, $scope);
	}

	$onInit() {
		/**
		 * Clear selected letter when the answerGrid is updated
		 */
		this.$rootScope.$on('answerGrid.update', () => {
			this.lcModel.clearSelected();
		});

		this.lcModel.clearSelected();

		this.$log.info('$onInit()', this);
	}

	$onDestroy() {
		return () => {
			this.lcModel.clearSelected();

			this.$log.info('destroy()', this);
		};
	}

	isClickable(pos) {
		return this.selected.position === -1 || this.selected.position == pos;
	}

	isLetterUsed(pos) {
		return this.puzzleModel.isLetterUsed(pos);
	}

	onLetterClick($event, letter, column, index, pos) {
		var data = {
			column: column,
			index: index,
			letter: letter,
			position: pos
		};

		$event.target.blur();

		this.$log.info('onLetterClick()', letter, column, index, pos, this.selected, this.isLetterUsed(pos));

		if (this.isLetterUsed(pos)) {
			let answerIndex = this.puzzleModel.getLetterUsedIndex(pos);

			this.$rootScope.$emit('letterColumns.update', {
				letter: '',
				index: answerIndex,
				lcPosition: -1
			});
		} else if (this.selected.position != pos) {
			this.lcModel.selectLetter(data);
		} else {
			this.lcModel.clearSelected();
		}
	}
}
