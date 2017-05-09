/* jshint esversion: 6 */
import Quotefall from './quotefall.js';

(($) => {
	var quote = '',
		puzzle = new Quotefall(),
		$input = $('.input-scrambled');

	$input.on('keydown', function(e) {
		var key = e.which;

		if (key > 90) {
			return false;
		}

		return true;
	});

	$('.btn-submit').on('click', function() {
		quote = $input.val();

		puzzle.generateBoard(quote);
	});
})(jQuery);
