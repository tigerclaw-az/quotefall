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
			// scope.setupPuzzle = ctrl.setupPuzzle;
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

	setupPuzzle() {
		console.debug('this', this);
		var letters = this.scrambledLetters,
			numRows = this.numRows || 4,
			numColumns;

		// letters = 'araoefaaleareofenunreseesyptozleq ot thlv  ut lus t   oly   z o '
		this.quote = letters.toUpperCase();

		this.rows = [].fill.call({ length: numRows }, 'x');

		numColumns = Math.ceil(this.quote.length / numRows);
		this.columns = [].fill.call({ length: numColumns }, 'x');

		this.createBoard();
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
