export type NCP<T extends Iterable<unknown>[]> = {
    [K in keyof T]: T[K] extends Iterable<infer U> ? U : never;
};

export function replay<T>(iterable: Iterable<T>): Iterable<T> {
    if (iterable instanceof Array) {
        return iterable;
    }

    const cache: T[] = [];

    return {
        [Symbol.iterator]: function* () {
            if (cache.length) {
                yield* cache;
                return;
            }

            for (const value of iterable) {
                cache.push(value);
                yield value;
            }
        }
    };
}
