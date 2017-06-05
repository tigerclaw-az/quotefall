export
default class LetterColumnsController {
	constructor($rootScope, $scope, $log, letterColumnsModel, puzzleModel) {
		'ngInject';

		this.$rootScope = $rootScope;
		this.$scope = $scope;
		this.$parent = this.$scope.$parent;
		this.$log = $log;

		this.lcModel = letterColumnsModel;
		this.$scope.puzzleModel = puzzleModel;
		this.$scope.puzzle = this.$parent.puzzle;

		this.$log.info('constructor()', this, $scope);
	}

	$onInit() {
		/**
		 * Clear selected letter when the answerGrid is updated
		 */
		this.$rootScope.$on('answerGrid.update', () => {
			this.lcModel.clearSelected();
		});

		this.$scope.selected = this.lcModel.selected;
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
		this.$log.info('isClickable()', this, pos);

		return this.$scope.selected.position == -1 ||
				this.$scope.selected.position == pos;
	}

	onLetterClick(letter, column, index, pos) {
		var data = {
			column: column,
			index: index,
			letter: letter,
			position: pos
		};

		this.$log.info('onLetterClick()', letter, column, index, pos);

		if (this.lcModel.selected.position != pos) {
			this.lcModel.selectLetter(data);
		} else {
			this.lcModel.clearSelected();
		}
	}
}
