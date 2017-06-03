export class PuzzleModelService {
	constructor($log, $state, answerGridModel, letterColumnsModel, puzzleStore) {
		'ngInject';

		this.$log = $log;
		this.$state = $state;

		this.agModel = answerGridModel;
		this.lcModel = letterColumnsModel;
		this.puzzleStore = puzzleStore;

		this.answerGrid = this.agModel.grid;
		this.letterColumns = this.lcModel.columns;

		this.$log.info('constructor()', this);

		this.clear();
	}

	getColumnFromPosition(pos) {
		return pos < this.columnSize ? pos : pos % this.columnSize;
	}

	newPuzzle(quote, rows, title) {
		var self = this,
			totalChars = quote.length,
			remainder = totalChars % rows;

		this.rowSize = rows;
		this.columnSize = Math.ceil(totalChars / this.rowSize);

		this.size = this.columnSize * this.rowSize;

		this.title = title;

		/* Pad the end of quote if size doesn't match columns */
		if (remainder > 0) {
			remainder = rows - remainder;
			quote += Array(remainder + 1).join(' ');
		}

		let letters = quote.toUpperCase().split('');

		this.lcModel.init(letters, this.columnSize);
		this.agModel.init(this.size);
	}

	save() {
		let data = {
			title: this.title,
			answerGrid: this.answerGrid,
			letterColumns: this.letterColumns,
			columnSize: this.columnSize,
			rowSize: this.rowSize
		};

		this.puzzleStore.insert(data);
		this.$state.go('app.list');
	}

	setupPuzzle(id) {
		this.id = id;

		let data = this.puzzleStore.get(id);

		this.columnSize = data.columnSize;
		this.rowSize = data.rowSize;
		this.title = data.title;

		this.agModel.setGrid(data.answerGrid);
		this.lcModel.setColumns(data.letterColumns);

		this.$log.info('setupPuzzle()', this, id, data);
	}

	clear() {
		this.id = null;
		this.title = '';
		this.columnSize = 0;
		this.rowSize = 4;
		this.size = 0;

		this.lcModel.clear();
		this.agModel.clear();
	}
}
