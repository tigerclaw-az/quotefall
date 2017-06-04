export class LetterColumnsModelService {
	constructor($log, _) {
		'ngInject';

		this.$log = $log;
		this._ = _;

		// this.data = {
		// 	columns: [],
		// 	letters: ''
		// };

		this.columns = [];
		this.selected = {};
		this.used = [];
	}

	init(letters, columnSize) {
		// letters = 'araoefaaleareofenunreseesyptozleq ot thlv  ut lus t   oly   z o '
		let i = -1,
			grouped = this._.groupBy(letters, function() {
				++i;

				return i % columnSize;
			});

		this.setColumns(grouped);
	}

	clear() {
		// this.data.columns = [];
		// Clear array properly in order to update any references
		this.columns.splice(0, this.columns.length);
		this.clearSelected();
	}

	clearSelected() {
		angular.copy({
			column: -1,
			index: -1,
			letter: '',
			position: -1
		}, this.selected);
	}

	selectLetter(data) {
		angular.copy(data, this.selected);
	}

	setColumns(group) {
		var groupArr = this._.values(group),
			// FIXME: Get size of puzzle from puzzleModel?
			size = groupArr.length * groupArr[0].length;

		this.$log.info('setColumns()', group, size);

		// angular.copy(this._.values(group), this.data.columns);
		angular.copy(groupArr, this.columns);
		angular.copy(this._.fill(Array(size), false), this.used);
	}
}
