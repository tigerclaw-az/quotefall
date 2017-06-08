'use strict';

import { AnswerGridComponent } from './answerGrid.component';
import { AnswerGridModelService } from './answerGridModel.service';

export
	default angular
			.module('answerGrid', [])
			.component('answerGrid', AnswerGridComponent)
			.service('answerGridModel', AnswerGridModelService)
;
