import $log from '../../shared/logger/es6-logger';

export class PuzzleController {
	constructor($scope, puzzleService, utils, moment) {
		'ngInject';

		this.$scope = $scope;
		this.$scope.$on('$destroy', this.destroy());

		this.puzzleService = puzzleService;
	}

	destroy() {
		return () => {
			$log.info('destroy', this);
			this.puzzleService.resetPuzzle();
		};
	}
}
