export class PuzzleStoreService {
	constructor($log, $http, utils, letterColumnsModel, answerGridModel) {
		'ngInject';

		this.$http = $http;
		this.$log = $log;

		this.$log.info('constructor()', this);
		this.lcService = letterColumnsModel;
		this.agService = answerGridModel;
		this.utils = utils;

		this.letterColumns = this.lcService.columns;
		this.answerGrid = this.agService.grid;

		this.puzzles = [];
	}

	get(id) {

	}

	insert(id) {
		this.puzzles.push({
			id: id,
			letterColumns: this.letterColumns,
			answerGrid: this.answerGrid
		});

		this.$log.info('insert()', angular.toJson(this.puzzles));
	}

	delete(id) {

	}

	loadPuzzles(url) {
		var successCb = (response) => {
				var data = response.data,
					status = response.status;

				this.$log.info(response);

				this.puzzles = data;
			},
			errorCb = (response) => {
				this.$log.info(response);
			};
		this.$http.get(url).then(successCb, errorCb);
	}
}
