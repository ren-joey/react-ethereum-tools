/**
 * 取得 start 到 end 中間的任意正整數自，並排除特定數值
 * @param start - 起始數
 * @param end - 結束數
 * @param but - 要排除的數字陣列
 * @returns 返回一個隨機正整數
 */
const getRandomNumberBut = (
    start: number,
    end: number,
    but: number[] = []
): number => {
    if (Math.abs(end - start + 1) < but.length) {
        throw new Error('排除的數字量過多，請檢查您的參數');
    }
    const during = end - start + 1;
    const random = Math.random();
    const res = Math.floor(random * during) + start;
    return (but.indexOf(res) > -1) ? getRandomNumberBut(start, end, but) : res;
};

export { getRandomNumberBut as default };
export { getRandomNumberBut };
