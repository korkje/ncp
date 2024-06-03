# ncp [![JSR](https://jsr.io/badges/@korkje/ncp)](https://jsr.io/@korkje/ncp)

Generates the n-fold Cartesian product of the given iterables.

```ts
import ncp from "jsr:@korkje/ncp";

for (const row of ncp([1, 2], [3, 4], [5, 6])) {
    console.log(row);
}

// Output:
// [ 1, 3, 5 ]
// [ 1, 3, 6 ]
// [ 1, 4, 5 ]
// [ 1, 4, 6 ]
// [ 2, 3, 5 ]
// [ 2, 3, 6 ]
// [ 2, 4, 5 ]
// [ 2, 4, 6 ]
```

The default export is a function generator, but a function that returns an array can be imported as well:

```ts
import { array } from "jsr:@korkje/ncp";

const product = array([1, 2], [3, 4], [5, 6]);
```

This is quite a bit faster than the generator at creating the whole product at once, but the generator can be more memory efficient and useful when you might not need all of it.
