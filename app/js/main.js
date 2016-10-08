(function($) {
	var quote = '',
		puzzle = new window.Quotefall(),
		$input = $('.input-scrambled');

	$input.on('keyup', function(e) {
		// TODO: Only allow letters and spaces
	});

	$('.btn-submit').on('click', function() {
		quote = $input.val();

		puzzle.generateBoard(quote);
	});
})(jQuery);
