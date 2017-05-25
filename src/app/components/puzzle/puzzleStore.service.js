export class PuzzleStoreService {
	constructor($log, utils, letterColumnsModel, answerGridModel) {
		'ngInject';

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
}
