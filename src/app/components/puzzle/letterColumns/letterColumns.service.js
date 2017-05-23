import $log from '../../../shared/logger/es6-logger';

export class LetterColumnsService {
	constructor(_) {
		'ngInject';

		this._ = _;

		this.data = {
			columns: [],
			letters: ''
		};

		// this.columns = [];
		// this.letters = '';

		this.size = 0;
	}

	init(letters, totalColumns, totalRows) {
		this.data.letters = letters;
		this.size = this.data.letters.length;

		let i = -1;
		let grouped = this._.groupBy(this.data.letters, function() {
			++i;

			return i % totalColumns;
		});

		angular.copy(this._.values(grouped), this.data.columns);
	}

	clear() {
		// Clear array properly in order to update any references
		// this.columns = this.columns.splice(0, this.columns.length);
		this.data.columns = [];
		// this.letters = this.letters.slice(this.letters.length);
		this.data.letters = '';
		this.size = 0;
	}
}
