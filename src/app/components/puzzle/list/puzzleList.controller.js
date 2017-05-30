export class PuzzleListController {
	constructor ($scope, $state, $log) {
		'ngInject';

		this.$scope = $scope;
		this.$log = $log;
		this.puzzleStore = $scope.$parent.main.puzzleStore;

		this.$log.info('constructor()', this);
	}
}
