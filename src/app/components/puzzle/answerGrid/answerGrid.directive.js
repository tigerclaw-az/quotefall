import $log from '../../../shared/logger/es6-logger';

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
	constructor($scope, answerGridService) {
		'ngInject';

		this.$scope = $scope;
		this.$scope.$on('$destroy', this.destroy());

		this.agService = answerGridService;
	}

	destroy() {
		return () => {
			$log.info('destory', this);
		};
	}

	onClickAnswerSquare(pos) {
		$log.info('onClickAnswerSquare()', pos);
		// this.puzzle.answerData[row][col] = true;
		this.agService.setReserved(pos);
	}
}
