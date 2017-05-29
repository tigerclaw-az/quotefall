export class MainController {
	constructor ($scope, $state, $log, $timeout, utils, puzzleStore, answerGridModel, letterColumnsModel) {
		'ngInject';

		this.$scope = $scope;
		this.$state = $state;

		this.activate($timeout);

		this.puzzleStore = puzzleStore;
		this.answerGridModel = answerGridModel;
		this.letterColumnsModel = letterColumnsModel;

		this.utils = utils;
	}

	activate($timeout) {
		$timeout(() => {
			this.classAnimation = 'rubberBand';
		}, 4000);
	}
}
