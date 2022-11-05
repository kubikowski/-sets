import { afterAll, describe, expect, it, jest } from '@jest/globals';
import { properSuperset } from '../../src';
import {
	coupleDisjoint,
	coupleEquivalent,
	fewDisjoint,
	fewEquivalent,
	manyDisjoint,
	manyEquivalent,
	multiplesOf1,
	multiplesOf2,
	multiplesOf3,
	padding,
	someDisjoint,
	someEquivalent,
	times,
} from '../constants/scale-testing.constants';
import { Timer } from '../constants/timer.model';

export function properSupersetScaleTest(): void {

	describe('proper superset ⋅ large sets', () => {
		it('properSuperset(of1):'.padEnd(padding), () => {
			const result = Timer.time('properSuperset', () => properSuperset(multiplesOf1));
			expect(result).toBe(true);
		});

		it('properSuperset(of1, of1):'.padEnd(padding), () => {
			const result = Timer.time('properSuperset', () => properSuperset(multiplesOf1, multiplesOf1));
			expect(result).toBe(false);
		});

		it('properSuperset(of1, of2):'.padEnd(padding), () => {
			const result = Timer.time('properSuperset', () => properSuperset(multiplesOf1, multiplesOf2));
			expect(result).toBe(true);
		});

		it('properSuperset(of2, of1):'.padEnd(padding), () => {
			const result = Timer.time('properSuperset', () => properSuperset(multiplesOf2, multiplesOf1));
			expect(result).toBe(false);
		});

		it('properSuperset(of1, of1, of1):'.padEnd(padding), () => {
			const result = Timer.time('properSuperset', () => properSuperset(multiplesOf1, multiplesOf1, multiplesOf1));
			expect(result).toBe(false);
		});

		it('properSuperset(of1, of2, of3):'.padEnd(padding), () => {
			const result = Timer.time('properSuperset', () => properSuperset(multiplesOf1, multiplesOf2, multiplesOf3));
			expect(result).toBe(true);
		});

		it('properSuperset(of3, of2, of1):'.padEnd(padding), () => {
			const result = Timer.time('properSuperset', () => properSuperset(multiplesOf3, multiplesOf2, multiplesOf1));
			expect(result).toBe(false);
		});
	});

	describe('proper superset ⋅ many sets', () => {
		it('properSuperset(100 Equivalent):'.padEnd(padding), () => {
			const result = Timer.time('properSuperset', () => properSuperset(...someEquivalent));
			expect(result).toBe(false);
		});

		it('properSuperset(10k Equivalent):'.padEnd(padding), () => {
			const result = Timer.time('properSuperset', () => properSuperset(...manyEquivalent));
			expect(result).toBe(false);
		});

		it('properSuperset(100 Disjoint):'.padEnd(padding), () => {
			const result = Timer.time('properSuperset', () => properSuperset(...someDisjoint));
			expect(result).toBe(false);
		});

		it('properSuperset(10k Disjoint):'.padEnd(padding), () => {
			const result = Timer.time('properSuperset', () => properSuperset(...manyDisjoint));
			expect(result).toBe(false);
		});
	});

	describe('proper superset ⋅ many times', () => {
		it('100k ⋅ properSuperset(2 Equivalent):'.padEnd(padding), () => {
			const properSupersetMock = jest.fn(properSuperset);
			Timer.manyTimes('properSuperset', () => properSupersetMock(...coupleEquivalent), times);
			expect(properSupersetMock).toHaveBeenCalledTimes(times);
		});

		it('100k ⋅ properSuperset(5 Equivalent):'.padEnd(padding), () => {
			const properSupersetMock = jest.fn(properSuperset);
			Timer.manyTimes('properSuperset', () => properSupersetMock(...fewEquivalent), times);
			expect(properSupersetMock).toHaveBeenCalledTimes(times);
		});

		it('100k ⋅ properSuperset(2 Disjoint):'.padEnd(padding), () => {
			const properSupersetMock = jest.fn(properSuperset);
			Timer.manyTimes('properSuperset', () => properSupersetMock(...coupleDisjoint), times);
			expect(properSupersetMock).toHaveBeenCalledTimes(times);
		});

		it('100k ⋅ properSuperset(5 Disjoint):'.padEnd(padding), () => {
			const properSupersetMock = jest.fn(properSuperset);
			Timer.manyTimes('properSuperset', () => properSupersetMock(...fewDisjoint), times);
			expect(properSupersetMock).toHaveBeenCalledTimes(times);
		});
	});

	afterAll(() => Timer.log('properSuperset'));
}
