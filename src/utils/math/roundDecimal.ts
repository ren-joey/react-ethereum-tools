/**
 * 四捨五入至小數點 N 位數
 * 可避免小數點精度問題
 * @param val - 原始數
 * @param precision - 四捨五入至小數點第 N 位
 * @returns 四捨五入後的數值
 */
const roundDecimal = (
    val: number,
    precision: number
): number => Math.round(val * (10 ** precision)) / (10 ** precision);

export { roundDecimal as default };
export { roundDecimal };
