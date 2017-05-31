export class PuzzleListController {
	constructor ($scope, $state, $log) {
		'ngInject';

		this.$scope = $scope;
		this.$log = $log;
		this.puzzleStore = $scope.$parent.puzzleStore;

		this.$log.info('constructor()', this, $scope);
	}
}
