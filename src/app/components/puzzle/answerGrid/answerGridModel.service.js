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
				lcPosition: null,
				letter: ''
			};
		}

		this.setGrid(defaultGrid);
	}

	clear() {
		this.grid.splice(0, this.grid.length);
	}

	containsLetter(pos) {
		let index = this._.findIndex(this.grid, function(o) {
			return o.lcPosition === pos;
		});

		return index >= 0 ? true : false;
	}

	setGrid(grid) {
		angular.copy(grid, this.grid);
	}

	update(type, obj) {
		if (type === 'reserved') {
			this.grid[obj.index].isReserved = !this.grid[obj.index].isReserved;
		} else {
			this.grid[obj.index].letter = obj.letter;
			this.grid[obj.index].lcPosition = obj.lcPosition;
		}
	}
}
