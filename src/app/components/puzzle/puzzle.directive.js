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
			scope.setupPuzzle = ctrl.setupPuzzle;
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
		var letters = this.main.scrambledLetters,
			numRows = this.main.numRows || 4,
			vm = this.vm,
			numColumns;

		// letters = 'araoefaaleareofenunreseesyptozleq ot thlv  ut lus t   oly   z o '
		vm.quote = letters.toUpperCase();

		vm.rows = [].fill.call({ length: numRows }, 'x');

		numColumns = Math.ceil(vm.quote.length / numRows);
		vm.columns = [].fill.call({ length: numColumns }, 'x');

		vm.createBoard();
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
