import { assert } from "@std/assert";
import ncp from "lib/array.ts";

Deno.test("ncp (array)", () => {
    const expected = [
        [1, "a", true],
        [1, "a", false],
        [1, "b", true],
        [1, "b", false],
        [2, "a", true],
        [2, "a", false],
        [2, "b", true],
        [2, "b", false],
    ];

    const actual = [...ncp(
        [1, 2],
        ["a", "b"],
        [true, false],
    )];

    assert(actual.length === expected.length);

    for (const [i, a] of actual.entries()) {
        assert(a.length === expected[i].length);

        for (const [j, v] of a.entries()) {
            assert(v === expected[i][j]);
        }
    }
});
