import M from "@korkje/memz";
import { replay, type NCP } from "lib/common.ts";

// deno-lint-ignore ban-types
const createFunction: ((n: number) => Function) = M(n => {
    const is = Array.from({ length: n }, (_, i) => i);
    const fors = is.map(i => `for (const _${i} of iterables[${i}]) `).join("");
    const values = is.map(i => `_${i}`).join(", ");

    return new Function(
        "iterables",
        "result",
        `${fors} result.push([${values}]);`
    );
});

/**
 * Creates and returns the n-fold Cartesian product for the given iterables.
 */
export const array = <T extends Iterable<unknown>[]>(...iterables: T): NCP<T>[] => {
    const result: NCP<T>[] = [];
    createFunction(iterables.length)(iterables.map(replay), result);
    return result;
};

export default array;
