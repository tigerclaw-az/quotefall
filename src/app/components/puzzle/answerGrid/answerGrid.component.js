import controller from './answerGrid.controller.js';

export const AnswerGridComponent = {
	bindings: {
		pc: '='
	},
	controller,
	controllerAs: 'answerGridCtrl',
	templateUrl: 'app/components/puzzle/answerGrid/answerGrid.tpl.html'
};
