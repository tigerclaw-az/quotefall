export class AnswerGridModelService {
	constructor($log, _) {
		'ngInject';

		this.$log = $log;
		this._ = _;

		this.grid = [];
	}

	init(size) {
		var defaultGrid = [];

		for (let i = 0; i < size; ++i) {
			defaultGrid[i] = {
				isReserved: false,
				letter: ''
			};
		}

		this.setGrid(defaultGrid);
	}

	clear() {
		this.grid.splice(0, this.grid.length);
	}

	setGrid(grid) {
		this.$log.info('setGrid()', grid);
		angular.copy(grid, this.grid);
	}

	setLetter(letter, pos) {
		this.grid[pos].letter = letter;
	}

	setReserved(pos) {
		this.grid[pos].isReserved = !this.grid[pos].isReserved;
		this.$log.info('setReserved()', pos, this.grid);
	}
}
