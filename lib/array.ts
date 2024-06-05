import M from "@korkje/memz";
import type { NCP } from "lib/common.ts";

function spread<T>(iterable: Iterable<T>): Iterable<T> {
    if (Array.isArray(iterable)) {
        return iterable;
    }

    return [...iterable];
}

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
    createFunction(iterables.length)(iterables.map(
        (iterable, i) => i === 0 ? iterable : spread(iterable)
    ), result);
    return result;
};

export default array;
