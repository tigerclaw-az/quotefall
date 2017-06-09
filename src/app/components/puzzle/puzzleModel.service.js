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

		this.difficultyOptions = [{
			name: 'Easy',
			value: 1
		}, {
			name: 'Hard',
			value: 2
		}, {
			name: 'Expert',
			value: 3
		}];

		this.clear();

		this.$log.info('constructor()', this);
	}

	clear() {
		this.id = null;
		this.columnSize = 0;
		this.difficulty = null;
		this.title = '';
		this.rowSize = 4;
		this.size = 0;

		this.lcModel.clear();
		this.agModel.clear();
	}

	getColumnFromPosition(pos) {
		return pos < this.columnSize ? pos : pos % this.columnSize;
	}

	getDifficulty(prop, value) {
		if (!prop) {
			return this.difficultyOptions;
		}

		return this._.find(this.difficultyOptions, function(o) {
			return o[prop] === value;
		});
	}

	getSelectedLetter() {
		this.$log.info('getSelectedLetter()', this.lcModel.selected);

		return this.lcModel.selected;
	}

	getLetterUsedIndex(pos) {
		return this._.findIndex(this.agModel.grid, function(o) {
			return o.lcPosition === pos;
		});
	}

	isLetterSelectedInColumn(index) {
		var col = this.getColumnFromPosition(index);

		return col === this.lcModel.selected.column;
	}

	isLetterUsed(pos) {
		// this.$log.info('isLetterUsed()', this, pos);

		return this.getLetterUsedIndex(pos) >= 0 ? true : false;
	}

	newPuzzle(data) {
		var self = this,
			quote = data.letters,
			totalChars = quote.length,
			rows = data.numRows,
			remainder = totalChars % rows;

		this.rowSize = rows;
		this.columnSize = Math.ceil(totalChars / this.rowSize);
		this.difficulty = data.difficulty;
		this.title = data.title;
		this.size = this.columnSize * this.rowSize;

		/* Pad the end of quote if size doesn't match columns */
		if (remainder > 0) {
			remainder = this.rowSize - remainder;
			quote += Array(remainder + 1).join(' ');
		}

		let letters = quote.toUpperCase().split('');

		this.lcModel.init(letters, this.columnSize);
		this.agModel.init(this.size);

		this.$log.info('newPuzzle()', this, data);
	}

	save() {
		let data = {
			date: moment.now(),
			id: this.utils.encode(this.utils.getUuid(true)),
			difficulty: this.difficulty,
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
			this.difficulty = data.difficulty;
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
