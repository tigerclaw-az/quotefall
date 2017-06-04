export function runBlock($log, $state, $trace, $transitions) {
	'ngInject';

	// Enable logging of state transition
	$trace.enable('TRANSITION');

	// Add any logic for handling errors from state transitions
	$state.defaultErrorHandler(function(error) {
		// console.error('error:', error);
	});

	$transitions.onStart({ to: 'puzzle' }, function(trans) {
		var id = trans.params().id,
			pModel = trans.injector().get('puzzleModel'),
			pStore = trans.injector().get('puzzleStore'),
			puzzle = pStore.get(id);

		$log.info('onEnter()', trans, pModel, puzzle);

		if (!puzzle) {
			$state.go('app.list');
		} else {
			pModel.setupPuzzle(puzzle);
		}
	});
};
