/**
 * 陣列加總器
 * @param arr - 欲加總的陣列
 * @returns 陣列加總的總數
 */
const sumReduce = (arr: number[]): number => {
    if (arr.length === 0) return 0;
    return arr.reduce((a, b) => a + b);
};

export { sumReduce as default };
export { sumReduce };
