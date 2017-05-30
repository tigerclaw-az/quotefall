export class PuzzleModelService {
	constructor($log, answerGridModel, letterColumnsModel) {
		'ngInject';

		this.$log = $log;

		this.agModel = answerGridModel;
		this.lcModel = letterColumnsModel;

		this.answerGrid = this.agModel.grid;
		this.letterColumns = this.lcModel.columns;

		this.$log.info('constructor()', this);

		this.clear();
	}

	newPuzzle(quote, rows, title) {
		var self = this,
			totalChars = quote.length,
			remainder = totalChars % rows;

		this.totalRows = rows;
		this.totalColumns = Math.ceil(totalChars / this.totalRows);

		this.size = this.totalColumns * this.totalRows;

		this.title = title;

		/* Pad the end of quote if size doesn't match columns */
		if (remainder > 0) {
			remainder = rows - remainder;
			quote += Array(remainder + 1).join(' ');
		}

		let letters = quote.toUpperCase().split('');

		this.lcModel.init(letters, this.totalColumns, this.totalRows);
		this.agModel.init(this.size);
	}

	clear() {
		this.title = '';
		this.totalColumns = 0;
		this.totalRows = 4;
		this.size = 0;

		this.lcModel.clear();
		this.agModel.clear();
	}
}
