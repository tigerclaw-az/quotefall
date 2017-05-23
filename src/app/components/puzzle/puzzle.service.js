import $log from '../../shared/logger/es6-logger';

export class PuzzleService {
	constructor(letterColumnsService, answerGridService) {
		'ngInject';

		this.lcService = letterColumnsService;
		this.agService = answerGridService;

		this.letterColumns = this.lcService.columns;
		this.answerGrid = this.agService.grid;

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
	}

	resetPuzzle() {
		this.lcService.clear();
		this.agService.clear();
	}
}
