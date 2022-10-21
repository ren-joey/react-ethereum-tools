/**
 * 右側補零工具
 * @param str - 原始字串或數字
 * @param length - 目標總長度
 * @returns 補完零後的字串，其長度等於指定總長
 */
const append0Right = (
    str: string|number,
    length: number
): string => {
    if (str.toString().length >= length) return str.toString();
    return append0Right(`${str}0`, length);
};

export { append0Right as default };
export { append0Right };
