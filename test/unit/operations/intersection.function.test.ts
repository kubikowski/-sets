import { describe, expect, it } from '@jest/globals';
import { equivalence, intersection } from '../../../src';
import { TestSets } from '../../util/test-sets/test-sets.model';
import { testSuite } from '../../util/test-suite.function';

describe('intersection', () => {
	testSuite('intersection', intersectionTests);
});

function intersectionTests<T>(testSets: TestSets<T>): void {
	const { a, b, empty, setA, setB, setC, setD, setE, setF, universal } = testSets;
	const intersectionAB = new Set<T>([ a, b ]);
	const intersectionABC = new Set<T>([ a ]);

	it('no sets intersection returns empty set', () => {
		const result = intersection();
		expect(equivalence(result, empty)).toBe(true);
	});

	it('single set intersection returns self', () => {
		const result = intersection(setA);
		expect(equivalence(result, setA)).toBe(true);
	});

	it('same set intersection returns self', () => {
		const result = intersection(setA, setA);
		expect(equivalence(result, setA)).toBe(true);
	});

	it('three of the same set intersection returns self', () => {
		const result = intersection(setA, setA, setA);
		expect(equivalence(result, setA)).toBe(true);
	});

	it('many of the same set intersection returns self', () => {
		const result = intersection(setA, setA, setA, setA, setA, setA);
		expect(equivalence(result, setA)).toBe(true);
	});

	it('two sets\' intersection is a subset of the first', () => {
		const result = intersection(setA, setB);
		expect(equivalence(result, intersectionAB)).toBe(true);
	});

	it('three sets\' intersection is a subset of the first', () => {
		const result = intersection(setA, setB, setC);
		expect(equivalence(result, intersectionABC)).toBe(true);
	});

	it('many sets\' intersection is a subset of the first', () => {
		const result = intersection(setA, setB, setC, setD, setE, setF);
		expect(equivalence(result, empty)).toBe(true);
	});

	it('many sets\' (reversed) intersection is a subset of the first', () => {
		const result = intersection(setF, setE, setD, setC, setB, setA);
		expect(equivalence(result, empty)).toBe(true);
	});

	it('any sets\' intersection with the empty set is the empty set', () => {
		const result = intersection(setA, empty);
		expect(equivalence(result, empty)).toBe(true);
	});

	it('any sets\' intersection with the universal set is itself', () => {
		const result = intersection(setA, universal);
		expect(equivalence(result, setA)).toBe(true);
	});

	it('the empty sets\' intersection with itself is itself', () => {
		const result = intersection(empty, empty);
		expect(equivalence(result, empty)).toBe(true);
	});
}