/**
 * 將數字加上逗號
 * @param number - 數字(1~n)
 * @returns 返回數字加上逗號，如 1万, 1.5万
 */
const number2StringNoRoundShort = (num: number): string => {
    let number: number;
    let sNumber: string;
    let float: number|string|undefined;
    let digit = '';
    if (num >= 10000) {
        number = Math.floor(num / 10000);
        float = num % 10000;
        float /= 10000;
        float = float.toString().split('0').join('');
        digit = '万';
    } else if (num >= 1000) {
        number = Math.floor(num / 1000);
        float = num % 1000;
        float = float.toString().split('0').join('');
        digit = '千';
    } else {
        number = num;
    }

    const aNumber: string[] = number.toString().split('').reverse();
    for (let i = 0; i < aNumber.length; i += 1) {
        if ((i + 1) % 4 === 0) {
            aNumber.splice(i, 0, ',');
        }
    }
    if (float) {
        sNumber = (aNumber.reverse().join('')) + float;
    } else {
        sNumber = (aNumber.reverse().join(''));
    }
    return `${sNumber}${digit}`;
};

export { number2StringNoRoundShort as default };
export { number2StringNoRoundShort };
