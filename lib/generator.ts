import M from "@korkje/memz";
import type { NCP } from "lib/common.ts";

function isIterableIterator<T>(iterable: Iterable<T>): iterable is IterableIterator<T> {
    // @ts-ignore: This is true for e.g. a generator.
    return iterable[Symbol.iterator]() === iterable;
}

class Replay<T> implements Iterable<T> {
    private cache: T[] = [];

    constructor(private iterable: IterableIterator<T>) {}

    [Symbol.iterator]() {
        if (this.cache.length) {
            return this.cache[Symbol.iterator]();
        }

        return this.iterator();
    }

    private iterator() {
        const iterator = this.iterable[Symbol.iterator]();

        return {
            next: () => {
                const result = iterator.next();

                if (!result.done) {
                    this.cache.push(result.value);
                }

                return result;
            }
        };
    }
}

function replay<T>(iterable: Iterable<T>): Iterable<T> {
    if (isIterableIterator(iterable)) {
        return new Replay(iterable);
    }

    return iterable;
}

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
