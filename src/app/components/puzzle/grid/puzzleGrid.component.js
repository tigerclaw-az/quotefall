import controller from './puzzleGrid.controller.js';

export const PuzzleGridComponent = {
	bindings: {
		pc: '='
	},
	controller,
	controllerAs: 'puzzleGridCtrl',
	require: '^puzzleCtrl',
	templateUrl: 'app/components/puzzle/grid/puzzleGrid.tpl.html'
};
