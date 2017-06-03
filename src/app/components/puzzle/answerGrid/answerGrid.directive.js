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

	onClickAnswerSquare(pos) {
		this.$log.info('onClickAnswerSquare()', pos);

		if (this.puzzle.model.id) {
			this.agModel.setLetter(this.lcModel.selected.letter, pos);
		} else {
			this.agModel.setReserved(pos);
		}
	}

	isLetterSelected(pos) {
		var col = this.puzzleModel.getColumnFromPosition(pos);

		return col === this.lcModel.selected.column;
	}
}
