/* jshint esversion: 6 */

export
default class Quotefall {
	constructor() {
		this.height = 50;
		this.width = 50;
		this.rows = 4;

		this.resetBoard();
	}

	getBoard(quote) {
		var self = this,
			remainder;

		this.quote = quote.toUpperCase();

		this.columns = Math.ceil(this.quote.length / this.rows);
		remainder = this.quote.length % this.rows;

		if (remainder > 0) {
			remainder = this.rows - remainder;
			this.quote += Array(remainder + 1).join(' ');
		}

		this.letters = this.quote.split('');

		for (let i = 0; i < this.columns; ++i) {
			let column;

			if (!this.puzzleData.columns[i]) {
				this.puzzleData.columns[i] = {};
			}

			column = this.puzzleData.columns[i];

			if (!column.letters) {
				column.letters = [];
			}

			for (let j = 0; j < this.rows; ++j) {
				let pos = this.columns * j,
					letter = this.letters[i + pos];

				column.letters.push(letter);
			}
		}

		return this.puzzleData;
	}

	resetBoard() {
		this.puzzleData = {
			columns: []
		};
	}
}
