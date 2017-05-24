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
	constructor($scope, $log, answerGridService) {
		'ngInject';

		this.$scope = $scope;
		this.$log = $log;

		this.$scope.$on('$destroy', this.destroy());

		this.agService = answerGridService;
	}

	destroy() {
		return () => {
			this.$log.info('destory', this);
		};
	}

	onClickAnswerSquare(pos) {
		this.$log.info('onClickAnswerSquare()', pos);
		// this.puzzle.answerData[row][col] = true;
		this.agService.setReserved(pos);
	}
}
