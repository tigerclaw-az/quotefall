import $log from '../../shared/logger/es6-logger';

export class PuzzleController {
	constructor($scope, puzzleService, letterColumnsService, utils, moment) {
		'ngInject';

		this.$scope = $scope;
		this.$scope.$on('$destroy', this.destroy());

		this.ps = puzzleService;

		this.letterColumnsService = letterColumnsService;
		$scope.columns = letterColumnsService.columns;
	}

	destroy() {
		return () => {
			$log.info('destory', this);
		};
	}

	savePuzzle() {
		$log.info('save', this);
	}

	setupPuzzle(letters, numRows = 4) {
		// letters = 'araoefaaleareofenunreseesyptozleq ot thlv  ut lus t   oly   z o '

		this.ps.newPuzzle(letters, numRows);
	}
}
