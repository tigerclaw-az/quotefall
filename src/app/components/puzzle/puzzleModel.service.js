export class PuzzleModelService {
	constructor($log, $state, _, utils, answerGridModel, letterColumnsModel, puzzleStore) {
		'ngInject';

		this.$log = $log;
		this.$state = $state;
		this._ = _;
		this.utils = utils;

		this.agModel = answerGridModel;
		this.lcModel = letterColumnsModel;
		this.puzzleStore = puzzleStore;

		this.clear();

		this.$log.info('constructor()', this);
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

	getColumnFromPosition(pos) {
		return pos < this.columnSize ? pos : pos % this.columnSize;
	}

	getSelectedLetter() {
		return this.lcModel.selected;
	}

	isLetterSelectedInColumn(index) {
		var col = this.getColumnFromPosition(index);

		return col === this.lcModel.selected.column;
	}

	isLetterUsed(pos) {
		let index = this._.findIndex(this.agModel.grid, function(o) {
			return o.lcPosition === pos;
		});

		return index >= 0 ? true : false;
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
			date: moment.now(),
			id: this.utils.encode(this.utils.getUuid(true)),
			title: this.title,
			answerGrid: this.agModel.grid,
			letterColumns: this.lcModel.columns,
			columnSize: this.columnSize,
			rowSize: this.rowSize
		};

		this.$log.info('save()', data, this);

		this.puzzleStore.insert(angular.merge({}, data));
		this.$state.go('app.list');
	}

	setupPuzzle(data) {
		this.$log.info('setupPuzzle()', this, data);

		try {
			this.id = data.id;

			this.columnSize = data.columnSize;
			this.rowSize = data.rowSize;
			this.title = data.title;

			this.agModel.setGrid(data.answerGrid);
			this.lcModel.setColumns(data.letterColumns);

			return true;
		} catch (e) {
			console.error(e);

			return false;
		}
	}
}
