import $log from '../../../shared/logger/es6-logger';

export class AnswerGridService {
	constructor(_) {
		'ngInject';

		this._ = _;
		this.grid = [];
	}

	init(size) {
		angular.copy(this._.fill(Array(size), false), this.grid);
		$log.info('init()', size, this.grid);
	}

	setReserved(pos) {
		this.grid[pos] = !this.grid[pos];
	}

	clear() {
		this.grid.splice(0, this.grid.length);
	}
}
