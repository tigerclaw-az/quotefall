export class PuzzleController {
	constructor($scope, $log, puzzleService, utils, moment) {
		'ngInject';

		this.$scope = $scope;
		this.$log = $log;

		this.$scope.$on('$destroy', this.destroy());

		this.puzzleService = puzzleService;
	}

	destroy() {
		return () => {
			this.$log.info('destroy', this);
			this.puzzleService.resetPuzzle();
		};
	}
}
