import M from "@korkje/memz";
import { replay, type NCP } from "lib/common.ts";

const createGeneratorFunction: ((n: number) => GeneratorFunction) = M(n => {
    const is = Array.from({ length: n }, (_, i) => i);
    const fors = is.map(i => `for (const _${i} of iterables[${i}]) `).join("");
    const values = is.map(i => `_${i}`).join(", ");

    return (function*() {}).constructor(
        "iterables",
        `${fors} yield [${values}];`
    );
});

/**
 * Iteratively generates the n-fold Cartesian product for the given iterables.
 */
export const generator = <T extends Iterable<unknown>[]>(...iterables: T): Generator<NCP<T>> =>
    createGeneratorFunction(iterables.length)(iterables.map(
        (iterable, i) => i === 0 ? iterable : replay(iterable)
    )) as Generator<NCP<T>>;

export default generator;
