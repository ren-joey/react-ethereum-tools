/**
 * 將數字加上逗號
 * @param number - 數字(1~n)
 * @returns 返回數字加上逗號，如 1,000萬
 */
const number2StringShort = (num: number): string => {
    let number: number;
    let digit = '';
    if (num >= 10000000) {
        number = num / 10000000;
        digit = '千万';
    } else if (num >= 1000000) {
        number = num / 1000000;
        digit = '百万';
    } else if (num >= 10000) {
        number = num / 10000;
        digit = '万';
    } else {
        number = num;
    }
    const aNumber: string[] = number.toString().split('').reverse();
    for (let i = 0; i < aNumber.length; i += 1) {
        if ((i + 1) % 4 === 0) {
            aNumber.splice(i, 0, ',');
        }
    }
    return `${aNumber.reverse().join('')}${digit}`;
};

export { number2StringShort as default };
export { number2StringShort };
