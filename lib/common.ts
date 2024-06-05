export type NCP<T extends Iterable<unknown>[]> = {
    [K in keyof T]: T[K] extends Iterable<infer U> ? U : never;
};

class Replay<T> implements Iterable<T> {
    private cache: T[] = [];

    constructor(private iterable: Iterable<T>) {}

    [Symbol.iterator]() {
        if (this.cache.length) {
            return this.cache[Symbol.iterator]();
        }

        return this.generator();
    }

    private *generator() {
        for (const value of this.iterable) {
            this.cache.push(value);
            yield value;
        }
    }
}

export function replay<T>(iterable: Iterable<T>): Iterable<T> {
    if (
        Array.isArray(iterable) ||
        typeof iterable === "string" ||
        iterable instanceof Set ||
        iterable instanceof Map ||
        ArrayBuffer.isView(iterable)
    ) {
        return iterable;
    }

    return new Replay(iterable);
}
