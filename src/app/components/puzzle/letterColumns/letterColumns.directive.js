export function LetterColumnsDirective() {
	'ngInject';

	let directive = {
		bindToController: true,
		controller: LetterColumnsController,
		controllerAs: 'letterColumnsCtrl',
		replace: true,
		restrict: 'E',
		scope: false,
		templateUrl: '/app/components/puzzle/letterColumns/letterColumns.tpl.html'
	};

	return directive;
}

class LetterColumnsController {
	constructor($scope, $log) {
		'ngInject';

		this.$scope = $scope;
		this.$parent = this.$scope.$parent;
		this.$log = $log;

		this.puzzle = this.$scope.puzzle;

		this.$log.info('constructor()', this, $scope);

		this.lcModel = this.puzzle.lcModel;
	}

	$onInit() {
		this.$log.info('$onInit', this);
		this.$scope.$on('$destroy', this.destroy());

		this.$scope.selected = this.lcModel.selected;
		this.$scope.used = this.lcModel.used;
		this.lcModel.clearSelected();
	}

	destroy() {
		return () => {
			this.lcModel.clearSelected();

			this.$log.info('destroy', this);
		};
	}

	isClickable(pos) {
		return this.$scope.selected.position == -1 ||
				this.$scope.selected.position == pos &&
				!this.$scope.used[pos];
	}

	onLetterClick(letter, column, index, pos) {
		var data = {
			column: column,
			index: index,
			letter: letter,
			position: pos
		};

		if (this.lcModel.selected.position != pos) {
			this.lcModel.selectLetter(data);
		} else {
			this.lcModel.clearSelected();
		}
	}
}
