export class MainController {
	constructor ($scope, $state, $log, $timeout, utils, puzzleStore, answerGridModel, letterColumnsModel) {
		'ngInject';

		this.$scope = $scope;
		this.$state = $state;

		this.activate($timeout);

		this.utils = utils;
		this.puzzleStore = puzzleStore;
		this.agService = answerGridModel;
		this.lcService = letterColumnsModel;

		this.puzzleId = this.utils.getUuid();
	}

	activate($timeout) {
		$timeout(() => {
			this.classAnimation = 'rubberBand';
		}, 4000);
	}
}
