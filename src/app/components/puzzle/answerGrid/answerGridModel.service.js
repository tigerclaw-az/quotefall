export class AnswerGridModelService {
	constructor($log, _) {
		'ngInject';

		this.$log = $log;
		this._ = _;

		this.grid = [];
	}

	init(size) {
		angular.copy(this._.fill(Array(size), false), this.grid);
		this.$log.info('init()', size, this.grid);
	}

	setReserved(pos) {
		this.grid[pos] = !this.grid[pos];
	}

	clear() {
		this.grid.splice(0, this.grid.length);
	}
}
