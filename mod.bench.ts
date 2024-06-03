import ncpGen from "lib/generator.ts";
import ncpArr from "lib/array.ts";
import fc from "npm:fast-cartesian";
import { CXProduct } from "npm:cxproduct";

const matrix = (m: number, n: number): number[][] => {
    const array = Array.from({ length: n }, (_, i) => i);
    return Array.from({ length: m }, () => array);
};

const m_1_65536 = matrix(1, 65536);
const m_2_256 = matrix(2, 256);
const m_4_16 = matrix(4, 16);
const m_8_4 = matrix(8, 4);
const m_16_2 = matrix(16, 2);

Deno.bench("ncp (generator)", { group: "1x65536" }, () => {
    const _arr = [...ncpGen.apply(null, m_1_65536)];
});

Deno.bench("ncp (generator)", { group: "2x256" }, () => {
    const _arr = [...ncpGen.apply(null, m_2_256)];
});

Deno.bench("ncp (generator)", { group: "4x16" }, () => {
    const _arr = [...ncpGen.apply(null, m_4_16)];
});

Deno.bench("ncp (generator)", { group: "8x4" }, () => {
    const _arr = [...ncpGen.apply(null, m_8_4)];
});

Deno.bench("ncp (generator)", { group: "16x2" }, () => {
    const _arr = [...ncpGen.apply(null, m_16_2)];
});

Deno.bench("ncp (array)", { group: "1x65536" }, () => {
    const _arr = ncpArr.apply(null, m_1_65536);
});

Deno.bench("ncp (array)", { group: "2x256" }, () => {
    const _arr = ncpArr.apply(null, m_2_256);
});

Deno.bench("ncp (array)", { group: "4x16" }, () => {
    const _arr = ncpArr.apply(null, m_4_16);
});

Deno.bench("ncp (array)", { group: "8x4" }, () => {
    const _arr = ncpArr.apply(null, m_8_4);
});

Deno.bench("ncp (array)", { group: "16x2" }, () => {
    const _arr = ncpArr.apply(null, m_16_2);
});

Deno.bench("fast-cartesian", { group: "1x65536" }, () => {
    const _arr = fc(m_1_65536);
});

Deno.bench("fast-cartesian", { group: "2x256" }, () => {
    const _arr = fc(m_2_256);
});

Deno.bench("fast-cartesian", { group: "4x16" }, () => {
    const _arr = fc(m_4_16);
});

Deno.bench("fast-cartesian", { group: "8x4" }, () => {
    const _arr = fc(m_8_4);
});

Deno.bench("fast-cartesian", { group: "16x2" }, () => {
    const _arr = fc(m_16_2);
});

Deno.bench("cxproduct", { group: "1x65536" }, () => {
    const _arr = [...CXProduct(m_1_65536).asGenerator()];
});

Deno.bench("cxproduct", { group: "2x256" }, () => {
    const _arr = [...CXProduct(m_2_256).asGenerator()];
});

Deno.bench("cxproduct", { group: "4x16" }, () => {
    const _arr = [...CXProduct(m_4_16).asGenerator()];
});

Deno.bench("cxproduct", { group: "8x4" }, () => {
    const _arr = [...CXProduct(m_8_4).asGenerator()];
});

Deno.bench("cxproduct", { group: "16x2" }, () => {
    const _arr = [...CXProduct(m_16_2).asGenerator()];
});
