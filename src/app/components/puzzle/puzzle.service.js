import $log from '../../shared/logger/es6-logger';

export class PuzzleService {
	constructor(letterColumnsService) {
		'ngInject';

		this.letterColumns = letterColumnsService;
		// this.answerSquares;

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

	newPuzzle(quote, rows) {
		var self = this,
			totalChars = quote.length,
			remainder = totalChars % rows;

		this.totalRows = rows;
		this.totalColumns = Math.ceil(totalChars / this.totalRows);

		// this.size = columns * rows;

		// this.columns = [].fill.call({ length: numColumns }, 'x');

		this.resetPuzzle();

		/* Pad the end of quote if size doesn't match columns */
		if (remainder > 0) {
			remainder = rows - remainder;
			quote += Array(remainder + 1).join(' ');
		}

		let letters = quote.toUpperCase().split('');

		this.letterColumns.init(letters, this.totalColumns, this.totalRows);
	}

	resetPuzzle() {
		// this.answerSquares.reset();

		// this.letterColumns.clear();
	}
}
