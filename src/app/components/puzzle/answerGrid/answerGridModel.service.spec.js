/* jscs:disable */

import { AnswerGridModelService } from './answerGridModel.service.js';

let agModel;

describe('answerGridModel service', () => {
	beforeEach(angular.mock.module('quotefall'));

	beforeEach(() => {
		agModel = new AnswerGridModelService();

		agModel.init(64);
	});

	it('should create empty grid of size 64', () => {
		expect(agModel.grid.length).toEqual(64);
	});

	it('should contain default objects in grid', () => {
		expect(agModel.grid[0].isReserved).not.toBeTruthy();
		expect(agModel.grid[0].letter).toEqual('');
	});

	it('should have different objects in grid', () => {
		expect(agModel.grid[0] === agModel.grid[1]).not.toBeTruthy();
	});

	describe('update()', () => {
		it('should set letter', () => {
			agModel.update('letter', {
				index: 0,
				letter: 'A'
			});

			expect(agModel.grid[0].letter).toEqual('A');
			expect(agModel.grid[1].letter).toEqual('');
		});

		it('should set isReserved', () => {
			agModel.update('reserved', {
				index: 0
			});

			expect(agModel.grid[0].isReserved).toBeTruthy();
			expect(agModel.grid[1].isReserved).not.toBeTruthy();
		});
	});
});
