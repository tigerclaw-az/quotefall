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
		this.$log = $log;

		this.$log.info('constructor()', this, $scope);

		this.lcModel = this.$scope.$parent.main.letterColumnsModel;
	}

	$onInit() {
		this.$log.info('$onInit', this);
		this.$scope.$on('$destroy', this.destroy());

		this.$scope.used = this.lcModel.used;
		this.clearSelected();
	}

	destroy() {
		return () => {
			this.clearSelected();

			this.$log.info('destroy', this);
		};
	}

	clearSelected() {
		this.$scope.selected = {
			column: -1,
			index: -1,
			letter: '',
			position: -1
		};
	}

	isClickable(pos) {
		return this.$scope.selected.position == -1 ||
				this.$scope.selected.position == pos &&
				!this.$scope.used[pos];
	}

	onLetterClick(letter, column, index, pos) {
		this.$log.info('onLetterClick()', letter, column, index);

		if (this.$scope.selected.position != pos) {
			this.$scope.selected = {
				column: column,
				index: index,
				letter: letter,
				position: pos
			};
		} else {
			this.clearSelected();
		}
	}
}
