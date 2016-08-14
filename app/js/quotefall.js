window.Quotefall = function(quote) {
	var remainder = 0;

	this.quote = quote.toUpperCase();
	this.puzzleData = {
		columns: [],
		squares: []
	};

	this.columns = Math.ceil(this.quote.length / this.rows);
	remainder = this.quote.length % this.rows;

	if (remainder > 0) {
		remainder = this.rows - remainder;
		this.quote += Array(remainder + 1).join(' ');
	}

	this.letters = this.quote.split('');

	for (var i = 0; i < this.columns; ++i) {
		var column;

		if (!this.puzzleData.columns[i]) {
			this.puzzleData.columns[i] = {};
		}

		column = this.puzzleData.columns[i];

		if (!column.letters) {
			column.letters = [];
		}

		for (var j = 0; j < this.rows; ++j) {
			var pos = this.columns * j;

			column.letters.push(this.letters[i + pos]);
		}
	}
};

window.Quotefall.prototype = {
	height: 50,
	width: 50,
	rows: 4,

	generateBoard: function() {
		var self = this;

		this.letters.forEach(function(val) {
			var isSpace = val === ' ';

			self.puzzleData.squares.push({ space: isSpace });
		});

		$('.puzzle').width(this.columns * this.width);

		dust.render('puzzle', this.puzzleData, function(err, out) {
			$('.puzzle').html(out);
		});
	}
};
