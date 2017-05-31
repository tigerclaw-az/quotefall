export class AnswerGridModelService {
	constructor($log, _) {
		'ngInject';

		this.$log = $log;
		this._ = _;

		this.grid = [];
	}

	init(size) {
		this.setGrid(this._.fill(Array(size), false));
	}

	setGrid(grid) {
		angular.copy(grid, this.grid);
	}

	setReserved(pos) {
		this.grid[pos] = !this.grid[pos];
	}

	clear() {
		this.grid.splice(0, this.grid.length);
	}
}
