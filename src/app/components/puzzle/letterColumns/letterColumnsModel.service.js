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
		this.letters = '';

		this.size = 0;
	}

	init(letters, totalColumns, totalRows) {
		// letters = 'araoefaaleareofenunreseesyptozleq ot thlv  ut lus t   oly   z o '
		let i = -1,
			grouped = this._.groupBy(letters, function() {
				++i;

				return i % totalColumns;
			});

		this.letters = letters;
		this.size = this.letters.length;

		// angular.copy(this._.values(grouped), this.data.columns);
		angular.copy(this._.values(grouped), this.columns);
	}

	clear() {
		// this.data.columns = [];
		// Clear array properly in order to update any references
		this.columns.splice(0, this.columns.length);
		this.letters = '';
		this.size = 0;
	}
}
