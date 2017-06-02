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

	setColumns(group) {
		// angular.copy(this._.values(group), this.data.columns);
		angular.copy(this._.values(group), this.columns);
		angular.copy(this._.fill(Array(this.columns.length * this.columns[0].length), false), this.used);
	}

	setUsed(pos) {
		this.used[pos] = true;
		this.$log.info('setUsed()', pos, this);
	}

	clear() {
		// this.data.columns = [];
		// Clear array properly in order to update any references
		this.columns.splice(0, this.columns.length);
	}
}
