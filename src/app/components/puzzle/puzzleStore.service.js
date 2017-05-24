export class PuzzleStoreService {
	constructor($log, utils, letterColumnsModel, answerGridModel) {
		'ngInject';

		this.$log = $log;

		this.$log.info('constructor()', this);
		this.lcService = letterColumnsModel;
		this.agService = answerGridModel;
		this.utils = utils;

		this.letterColumns = this.lcService.columns;
		this.answerGrid = this.agService.grid;

		this.puzzles = [];

		this.totalColumns = 0;
		this.totalRows = 4;
		this.size = 0;
	}

	get(id) {

	}

	insert(id) {
		this.puzzles.push({
			id: id,
			letterColumns: this.letterColumns,
			answerGrid: this.answerGrid
		});

		this.$log.info('insert()', angular.toJson(this.puzzles));
	}

	delete(id) {

	}

	create(quote, rows = 4) {
		var self = this,
			totalChars = quote.length,
			remainder = totalChars % rows;

		this.totalRows = rows;
		this.totalColumns = Math.ceil(totalChars / this.totalRows);

		this.size = this.totalColumns * this.totalRows;

		this.resetPuzzle();

		/* Pad the end of quote if size doesn't match columns */
		if (remainder > 0) {
			remainder = rows - remainder;
			quote += Array(remainder + 1).join(' ');
		}

		let letters = quote.toUpperCase().split('');

		this.lcService.init(letters, this.totalColumns, this.totalRows);
		this.agService.init(this.size);

		this.$log.info('newPuzzle()', this.puzzles);
	}

	resetPuzzle() {
		this.lcService.clear();
		this.agService.clear();
	}
}
