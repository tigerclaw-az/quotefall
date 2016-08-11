window.Quotefall = function(quote) {
	var remainder = 0;

	this.quote = quote;
	this.totalColumns = Math.ceil(this.quote.length / this.rows);
	remainder = this.quote.length % this.rows;

	if (remainder > 0) {
		remainder = this.rows - remainder;
		this.quote += Array(remainder + 1).join(' ');
	}

	this.letters = this.quote.split('');
	this.puzzleData = {
		letters: []
	};
};

window.Quotefall.prototype = {
	height: 50,
	width: 50,
	rows: 4,

	generateBoard: function() {
		var self = this;

		this.letters.forEach(function(val) {
			var isSpace = val === ' ';

			self.puzzleData.letters.push({ space: isSpace });
		});

		$('.puzzle').width(this.totalColumns * this.width);

		dust.render('puzzle', this.puzzleData, function(err, out) {
			$('.puzzle').html(out);
		});
	}
};
