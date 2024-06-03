export type NCP<T extends Iterable<unknown>[]> = {
    [K in keyof T]: T[K] extends Iterable<infer U> ? U : never;
};
