export class PuzzleStoreService {
	constructor($log, $http, utils, answerGridModel, letterColumnsModel, puzzleModel) {
		'ngInject';

		this.$http = $http;
		this.$log = $log;

		this.agModel = answerGridModel;
		this.lcModel = letterColumnsModel;
		this.pModel = puzzleModel;
		this.utils = utils;

		this.$log.info('constructor()', this);

		this.puzzles = [];
	}

	get(id) {

	}

	insert() {
		this.puzzles.push({
			id: this.utils.getUuid(true),
			title: this.pModel.title,
			letterColumns: this.lcModel.columns,
			answerGrid: this.agModel.grid
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
