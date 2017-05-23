export function AnswerGridDirective() {
	'ngInject';

	let directive = {
		bindToController: true,
		controller: AnswerGridController,
		controllerAs: 'answerGrid',
		replace: true,
		restrict: 'E',
		scope: false,
		templateUrl: 'app/components/puzzle/answerGrid/answerGrid.tpl.html'
	};

	return directive;
}

class AnswerGridController {
	constructor($scope, $log, moment) {
		'ngInject';

		this.$scope = $scope;
		this.$log = $log;
		$log.info('$scope', $scope);
		this.$scope.$on('$destroy', this.destroy());
	}

	destroy() {
		return () => {
			this.$log.info('destory', this);
		};
	}

	onClickAnswerSquare(row, col) {
		this.$log.info('onClickAnswerSquare', this.puzzle);
		this.puzzle.answerData[row][col] = true;
	}
}
