export class PuzzleGridModelService {
	constructor($log, answerGridModel, letterColumnsModel) {
		'ngInject';

		this.$log = $log;

		// this.puzzleStore = puzzleStore;
		this.agModel = answerGridModel;
		this.lcModel = letterColumnsModel;

		this.answerGrid = this.agModel.grid;
		this.letterColumns = this.lcModel.columns;

		this.totalColumns = 0;
		this.totalRows = 4;
		this.size = 0;
	}

	newPuzzle(quote, rows) {
		var self = this,
			totalChars = quote.length,
			remainder = totalChars % rows;

		this.totalRows = rows;
		this.totalColumns = Math.ceil(totalChars / this.totalRows);

		this.size = this.totalColumns * this.totalRows;

		/* Pad the end of quote if size doesn't match columns */
		if (remainder > 0) {
			remainder = rows - remainder;
			quote += Array(remainder + 1).join(' ');
		}

		let letters = quote.toUpperCase().split('');

		this.lcModel.init(letters, this.totalColumns, this.totalRows);
		this.agModel.init(this.size);

		// this.$log.info('newPuzzle()', this.puzzles);
	}
}
