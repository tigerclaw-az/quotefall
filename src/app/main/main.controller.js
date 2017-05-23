export class MainController {
	constructor ($scope, $state, $log, $timeout, puzzleService, letterColumnsService) {
		'ngInject';

		this.$scope = $scope;
		this.$state = $state;

		this.activate($timeout);

		this.puzzles = [];
		this.lcService = letterColumnsService;
		this.puzzleService = puzzleService;
	}

	activate($timeout) {
		$timeout(() => {
			this.classAnimation = 'rubberBand';
		}, 4000);
	}
}
