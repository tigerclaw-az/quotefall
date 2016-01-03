var Quotefall = function(quote) {
	this.quote = quote;
	this.letters = quote.split('');
	this.totalColumns = Math.ceil(this.letters.length / this.rows);
};

Quotefall.prototype = {
	rows: 4
};

(function($) {
	var quote = 'if those space scientists are so smart why do they all count backward',
		puzzle = new Quotefall(quote);
})(jQuery);
