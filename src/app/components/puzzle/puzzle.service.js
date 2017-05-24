export class PuzzleService {
	constructor($log, letterColumnsService, answerGridService, utils) {
		'ngInject';

		this.$log = $log;

		this.$log.info('constructor()', this);
		this.lcService = letterColumnsService;
		this.agService = answerGridService;
		this.utils = utils;

		this.letterColumns = this.lcService.columns;
		this.answerGrid = this.agService.grid;

		this.puzzles = [];

		this.totalColumns = 0;
		this.totalRows = 4;
		this.size = 0;
	}

	getPuzzle(id) {

	}

	savePuzzle(id) {

	}

	deletePuzzle(id) {

	}

	newPuzzle(quote, rows = 4) {
		var self = this,
			totalChars = quote.length,
			remainder = totalChars % rows,
			id = this.utils.getUuid();

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

		this.puzzles.push({
			id: id,
			letterColumns: this.letterColumns,
			answerGrid: this.answerGrid
		});

		this.$log.info('newPuzzle()', this.puzzles);
	}

	resetPuzzle() {
		this.lcService.clear();
		this.agService.clear();
	}

	savePuzzle() {
		// this.$log.info('savePuzzle()', JSON.stringify(this.puzzles));

	}
}
