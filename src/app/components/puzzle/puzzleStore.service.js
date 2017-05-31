export class PuzzleStoreService {
	constructor($log, $http, _, moment, utils) {
		'ngInject';

		this.$http = $http;
		this.$log = $log;
		this._ = _;

		this.utils = utils;

		this.$log.info('constructor()', this);

		this.data = {
			puzzles: []
		};
	}

	get(id) {
		this.$log.info('get()', id, this);

		return this._.find(this.data.puzzles, function(o) {
			return o.id == id;
		});
	}

	insert(puzzleData) {
		let obj = {
				date: moment.now(),
				id: this.utils.encode(this.utils.getUuid(true))
			};
			// newPuzzles = this.puzzles.slice();

		// newPuzzles.push(angular.merge({}, obj, puzzleData));
		// angular.copy(newPuzzles, this.puzzles);

		this.data.puzzles.push(angular.merge({}, obj, puzzleData));

		this.$log.info('insert()', angular.toJson(this.data.puzzles));
	}

	delete(id) {

	}

	loadPuzzles(url) {
		var successCb = (response) => {
				var data = response.data,
					status = response.status;

				this.$log.info(response);

				angular.copy(data, this.data.puzzles);
			},
			errorCb = (response) => {
				this.$log.info(response);
			};

		this.$http.get(url).then(successCb, errorCb);
	}
}
