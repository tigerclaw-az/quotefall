export function AnswerGridDirective() {
	'ngInject';

	let directive = {
		bindToController: true,
		controller: AnswerGridController,
		controllerAs: 'answerGridCtrl',
		replace: true,
		restrict: 'E',
		scope: false,
		templateUrl: 'app/components/puzzle/answerGrid/answerGrid.tpl.html'
	};

	return directive;
}

class AnswerGridController {
	constructor($scope, $log) {
		'ngInject';

		this.$scope = $scope;
		this.$parent = this.$scope.$parent;
		this.$log = $log;

		this.puzzle = this.$scope.puzzle;
		this.puzzleModel = this.$scope.puzzle.model;

		this.agModel = this.puzzle.agModel;
		this.lcModel = this.puzzle.lcModel;
	}

	$onInit() {
		this.$log.info('$onInit()', this);

		this.$scope.$on('$destroy', this.destroy());
	}

	destroy() {
		return () => {
			this.$log.info('destroy', this);
		};
	}

	onClickAnswerSquare(index) {
		this.$log.info('onClickAnswerSquare()', index);

		if (this.puzzle.model.id) {
			// TODO: Don't allow click if outside selected "column"
			this.agModel.update('letter', {
				letter: this.lcModel.selected.letter,
				index: index,
				lcPosition: this.lcModel.selected.position
			});

			this.lcModel.clearSelected();
		} else {
			this.agModel.update('reserved', {
				index: index
			});
		}
	}

	isLetterSelected(index) {
		var col = this.puzzleModel.getColumnFromPosition(index);

		return col === this.lcModel.selected.column;
	}
}
