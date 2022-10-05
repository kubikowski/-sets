/**
 * Value Overlaps:
 *
 * - 0: shared by setA, setB, and setC
 * - 1: shared by setA, setB
 * - 2: shared by setA, setC
 * - 3: shared by setB, setC
 * - 4: unique to setA
 * - 5: unique to setB
 * - 6: unique to setC
 */

/* contains: 0, 1, 2, 4 */
export const setA = new Set<number>([ 0, 1, 2, 4 ]);
/* contains: 0, 1, 3, 5 */
export const setB = new Set<number>([ 0, 1, 3, 5 ]);
/* contains: 0, 2, 3, 6 */
export const setC = new Set<number>([ 0, 2, 3, 6 ]);
/* contains: none */
export const empty = new Set<never>();


export function standardComparator<T>(a: T, b: T): number {
	return (a < b) ? -1 : 1;
}

export function reverseComparator<T>(a: T, b: T): number {
	return (a > b) ? -1 : 1;
}
