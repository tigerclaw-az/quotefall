export function PuzzleDirective() {
	'ngInject';

	let directive = {
		bindToController: true,
		controller: PuzzleController,
		controllerAs: 'vm',
		replace: true,
		restrict: 'A',
		scope: false,
		templateUrl: 'app/components/puzzle/puzzle.tpl.html',
		link: function(scope, el, attr, ctrl) {
			scope.setupPuzzle = ctrl.setupPuzzle.bind(this, scope, ctrl);
		}
	};

	return directive;
}

class PuzzleController {
	constructor (moment) {
		'ngInject';

		this.height = 50;
		this.width = 50;
	}

	setupPuzzle(scope, ctrl) {
		var letters = scope.main.scrambledLetters,
			numRows = scope.main.numRows || 4,
			numColumns;

		// letters = 'araoefaaleareofenunreseesyptozleq ot thlv  ut lus t   oly   z o '
		ctrl.quote = letters.toUpperCase();

		ctrl.rows = [].fill.call({ length: numRows }, 'x');

		numColumns = Math.ceil(ctrl.quote.length / numRows);
		ctrl.columns = [].fill.call({ length: numColumns }, 'x');

		ctrl.createBoard();
	}

	createBoard() {
		var self = this,
			rows,
			columns,
			remainder;

		this.resetBoard();

		columns = this.columns.length;
		rows = this.rows.length;

		remainder = this.quote.length % rows;

		if (remainder > 0) {
			remainder = rows - remainder;
			this.quote += Array(remainder + 1).join(' ');
		}

		this.letters = this.quote.split('');

		for (let i = 0; i < columns; ++i) {
			let column;

			if (!this.puzzleData.columns[i]) {
				this.puzzleData.columns[i] = {};
			}

			column = this.puzzleData.columns[i];

			if (!column.letters) {
				column.letters = [];
			}

			for (let j = 0; j < rows; ++j) {
				let pos = columns * j,
					letter = this.letters[i + pos];

				column.letters.push(letter);
			}
		}
	}

	resetBoard() {
		this.puzzleData = {
			columns: []
		};
	}
}
