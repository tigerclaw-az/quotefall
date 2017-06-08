import { PuzzleController } from './puzzle.controller';
import { PuzzleModelService } from './puzzleModel.service';
import { PuzzleStoreService } from './puzzleStore.service';

export
	default angular
		.module('puzzle', [])
		.controller('puzzleController', PuzzleController)
		.service('puzzleModel', PuzzleModelService)
		.service('puzzleStore', PuzzleStoreService)
;
