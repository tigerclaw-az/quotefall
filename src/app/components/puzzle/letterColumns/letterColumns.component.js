import controller from './letterColumns.controller.js';

export const LetterColumnsComponent = {
	bindings: {
		selected: '=',
		pc: '='
	},
	controller,
	controllerAs: 'letterColumnsCtrl',
	templateUrl: '/app/components/puzzle/letterColumns/letterColumns.tpl.html'
};
