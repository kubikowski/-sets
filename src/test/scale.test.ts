import { expect, it } from '@jest/globals';
import { difference, disjoint, equivalence, intersection, sort, subset, superset, union, xor } from '../index';
import { Multiples, time } from './constants/scale-testing-constants';
import { reverseComparator } from './constants/sort-testing-constants';

describe('Scale Tests', () => {
	const multiplesOf1 = time('copying 10_000_000', Multiples.of1);
	const multiplesOf2 = time('copying 5_000_000', Multiples.of2);
	const multiplesOf3 = time('copying 3_333_333', Multiples.of3);

	it('difference scale tests', () => {
		const result1 = time('difference of 1', () => difference(multiplesOf1));
		const result2 = time('difference of 2', () => difference(multiplesOf1, multiplesOf2));
		const result3 = time('difference of 3', () => difference(multiplesOf1, multiplesOf2, multiplesOf3));

		expect(result1.size).toBe(10_000_000);
		expect(result2.size).toBe(5_000_000);
		expect(result3.size).toBe(3_333_334);
	});

	it('disjoint scale tests', () => {
		const result1 = time('disjoint of 1', () => disjoint(multiplesOf1));
		const result2 = time('disjoint of 2', () => disjoint(multiplesOf1, multiplesOf2));
		const result3 = time('disjoint of 3', () => disjoint(multiplesOf1, multiplesOf2, multiplesOf3));

		expect(result1).toBe(true);
		expect(result2).toBe(false);
		expect(result3).toBe(false);
	});

	it('equivalence scale tests', () => {
		const result1 = time('equivalence of 1', () => equivalence(multiplesOf1));
		const result2 = time('equivalence of 2', () => equivalence(multiplesOf1, multiplesOf2));
		const result3 = time('equivalence of 3', () => equivalence(multiplesOf1, multiplesOf2, multiplesOf3));

		expect(result1).toBe(true);
		expect(result2).toBe(false);
		expect(result3).toBe(false);
	});

	it('intersection scale tests', () => {
		const result1 = time('intersection of 1', () => intersection(multiplesOf1));
		const result2 = time('intersection of 2', () => intersection(multiplesOf1, multiplesOf2));
		const result3 = time('intersection of 3', () => intersection(multiplesOf1, multiplesOf2, multiplesOf3));

		expect(result1.size).toBe(10_000_000);
		expect(result2.size).toBe(5_000_000);
		expect(result3.size).toBe(1_666_667);
	});

	it('subset scale tests', () => {
		const result1 = time('subset of 1', () => subset(multiplesOf1));
		const result2 = time('subset of 2', () => subset(multiplesOf1, multiplesOf2));
		const result3 = time('subset of 3', () => subset(multiplesOf1, multiplesOf2, multiplesOf3));

		expect(result1).toBe(true);
		expect(result2).toBe(false);
		expect(result3).toBe(false);
	});

	it('superset scale tests', () => {
		const result1 = time('superset of 1', () => superset(multiplesOf1));
		const result2 = time('superset of 2', () => superset(multiplesOf1, multiplesOf2));
		const result3 = time('superset of 3', () => superset(multiplesOf1, multiplesOf2, multiplesOf3));

		expect(result1).toBe(true);
		expect(result2).toBe(true);
		expect(result3).toBe(true);
	});

	it('union scale tests', () => {
		const result1 = time('union of 1', () => union(multiplesOf1));
		const result2 = time('union of 2', () => union(multiplesOf1, multiplesOf2));
		const result3 = time('union of 3', () => union(multiplesOf1, multiplesOf2, multiplesOf3));

		expect(result1.size).toBe(10_000_000);
		expect(result2.size).toBe(10_000_000);
		expect(result3.size).toBe(10_000_000);
	});

	it('xor scale tests', () => {
		const result1 = time('xor of 1', () => xor(multiplesOf1));
		const result2 = time('xor of 2', () => xor(multiplesOf1, multiplesOf2));
		const result3 = time('xor of 3', () => xor(multiplesOf1, multiplesOf2, multiplesOf3));

		expect(result1.size).toBe(10_000_000);
		expect(result2.size).toBe(5_000_000);
		expect(result3.size).toBe(3_333_334);
	});

	it('sort scale tests', () => {
		const result1 = time('sort of 10M', () => sort(multiplesOf1, reverseComparator));
		const result2 = time('sort of 5M', () => sort(multiplesOf2, reverseComparator));
		const result3 = time('sort of 3M', () => sort(multiplesOf3, reverseComparator));

		expect(result1.size).toBe(10_000_000);
		expect(result2.size).toBe(5_000_000);
		expect(result3.size).toBe(3_333_333);
	});
});
