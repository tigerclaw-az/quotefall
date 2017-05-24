export class MainController {
	constructor ($scope, $state, $log, $timeout, utils, puzzleStore) {
		'ngInject';

		this.$scope = $scope;
		this.$state = $state;

		this.activate($timeout);

		this.utils = utils;
		this.puzzleStore = puzzleStore;

		this.puzzleId = this.utils.getUuid();
	}

	activate($timeout) {
		$timeout(() => {
			this.classAnimation = 'rubberBand';
		}, 4000);
	}
}
