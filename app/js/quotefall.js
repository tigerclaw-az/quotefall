window.quotefall = function(quote) {
	this.quote = quote;
	this.letters = quote.split('');
	this.totalColumns = Math.ceil(this.letters.length / this.rows);
	this.puzzleData = {
		letters: []
	};
};

window.quotefall.prototype = {
	rows: 4,

	generateBoard: function() {
		var self = this;

		this.letters.forEach(function(val) {
			var isSpace = val === ' ';

			self.puzzleData.letters.push({ space: isSpace });
		});

		dust.render('puzzle', this.puzzleData, function(err, out) {
			$('.puzzle').html(out);
		});
	}
};
