export class PuzzleController {
	constructor($scope, $log, utils, puzzleStore, answerGridModel, letterColumnsModel) {
		'ngInject';

		this.$scope = $scope;
		this.$log = $log;

		this.$scope.$on('$destroy', this.destroy());

		this.puzzleStore = puzzleStore;
		this.agModel = answerGridModel;
		this.lcModel = letterColumnsModel;

		this.utils = utils;

		this.id = this.utils.getUuid();
	}

	destroy() {
		return () => {
			this.$log.info('destroy', this);
		};
	}
}
