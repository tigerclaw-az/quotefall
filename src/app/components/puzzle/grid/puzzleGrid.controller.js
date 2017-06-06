export
default class PuzzleGridController {
	constructor($scope, $log) {
		'ngInject';

		this.$scope = $scope;
		this.$log = $log;

		this.$log.info('constructor()', this, $scope);
	}

	$onInit() {
		this.$log.info('$onInit()', this);
	}

	$onDestroy() {
		return () => {
			this.$log.info('destroy', this);
		};
	}
}
