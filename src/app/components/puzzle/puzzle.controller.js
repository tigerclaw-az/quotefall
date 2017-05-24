export class PuzzleController {
	constructor($scope, $log, utils, puzzleStore) {
		'ngInject';

		this.$scope = $scope;
		this.$log = $log;

		this.$scope.$on('$destroy', this.destroy());

		this.puzzleStore = puzzleStore;
		this.utils = utils;

		this.id = this.utils.getUuid();
	}

	destroy() {
		return () => {
			this.$log.info('destroy', this);
			this.puzzleStore.resetPuzzle();
		};
	}
}
