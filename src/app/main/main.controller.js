export class MainController {
	constructor ($scope, $state, $log, $timeout, utils, answerGridModel, letterColumnsModel, puzzleModel, puzzleStore) {
		'ngInject';

		this.$log = $log;
		this.$scope = $scope;
		this.$state = $state;

		this.activate($timeout);

		this.answerGridModel = answerGridModel;
		this.letterColumnsModel = letterColumnsModel;
		this.puzzleModel = puzzleModel;
		this.puzzleStore = puzzleStore;
		this.utils = utils;

		$scope.puzzleStore = this.puzzleStore;

		this.$log.info('constructor()', this, $scope);
	}

	$onInit() {
		this.$log.info('$onInit()', this);
	}

	activate($timeout) {
		$timeout(() => {
			this.classAnimation = 'rubberBand';
		}, 4000);
	}
}
