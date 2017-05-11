/* jshint esversion: 6 */
import Quotefall from './quotefall.js';

(($) => {
	var quote = '',
		qf = new Quotefall(),
		$input = $('.qf-input-letters'),
		$puzzle = $('.qf-puzzle');

	$puzzle.width(qf.columns * qf.width);

	/**
	 * Watch for keydown event and only allow alphabetic characters
	 * @param  {Object} e
	 * @return {Boolean}
	 */
	$input.on('keydown', function(e) {
		var key = e.which;

		if (key > 90) {
			return false;
		}

		return true;
	});

	/**
	 * Generate the board when button is clicked
	 */
	$('.qf-set-board').on('click', function() {
		var board;

		quote = $input.val();

		qf.resetBoard();
		board = qf.getBoard(quote);

		dust.render('puzzle', board, function(err, out) {
			$puzzle.html(out);
		});
	});
})(jQuery);
