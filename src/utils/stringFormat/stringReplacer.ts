import { BigNumber } from 'ethers';

/**
 * @description
 * 文字參數替換器，
 * 將 str 中的 ${} 按照 props 的順序，
 * 依序替換掉。
 * @param str 原始字串，要替換的參數位置請加入 ${} 符號
 * @param props 要替換掉 ${} 符號的參數
 */
type ableToString = number|string|BigNumber;

const stringReplacer = (
    str: string,
    ...props: ableToString[]
) => {
    for (let i = 0; i < props.length; i += 1) {
        const prop = props[i];
        str = str.replace('${}', prop.toString());
    }
    return str;
};

export default stringReplacer;