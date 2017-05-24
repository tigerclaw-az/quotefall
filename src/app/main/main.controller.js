export class MainController {
	constructor ($scope, $state, $log, $timeout, puzzleService, answerGridService, letterColumnsService) {
		'ngInject';

		this.$scope = $scope;
		this.$state = $state;

		this.activate($timeout);

		this.puzzleService = puzzleService;
		this.agService = answerGridService;
		this.lcService = letterColumnsService;
	}

	activate($timeout) {
		$timeout(() => {
			this.classAnimation = 'rubberBand';
		}, 4000);
	}
}
