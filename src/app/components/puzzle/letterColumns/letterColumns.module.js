import { LetterColumnsComponent } from './letterColumns.component';
import { LetterColumnsModelService } from './letterColumnsModel.service';

export
	default angular
		.module('letterColumns', [])
		.component('letterColumns', LetterColumnsComponent)
		.service('letterColumnsModel', LetterColumnsModelService)
;
