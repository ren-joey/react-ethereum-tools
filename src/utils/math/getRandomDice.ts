import utils from '../interface';
import { getRandomNumber } from './getRandomNumber';
import { sumReduce } from './sumReduce';

/**
 * 當總數過大 / 過小，超出骰子數目可以顯示的範圍時 throw error
 * @param total - 所有骰子總和
 * @param left - 剩餘的骰子數量
 */
const throwError = (total: number, left: number) => {
    throw new Error(`
    getRandomDice() -> *** ERROR ***
    Dice are not reachable to the total amount.
    Please check out the parameters you sent:
    { total: ${total}, left: ${left} }
    `);
};

/**
 * 傳入總數及骰子數
 * 回傳一個骰子點數隨機分配的陣列
 * @param param0 - {@link utils.DiceConfig | 參考介面}
 * @returns 骰子點數總和
 */
const getRandomDice = (
    { total, left, known = [] }: utils.DiceConfig
): number[] => {
    if (total < left
        || (left * 6 < total && known.length === 0)
        || !total || !left) throwError(total, left);

    const knownTotal = known.length === 0 ? 0 : sumReduce(known);
    if (left === 1) {
        known.push(total - knownTotal);
        return known;
    }

    // 隨機骰 = (總步數 - ((剩餘骰數 - 1) * 6) - (已知骰數總和)) ~ 6]
    let max = 1;
    for (let i = 6; i >= 1; i -= 1) {
        const _min = (total - ((left - 1) * i) - knownTotal);
        if (_min > 0) {
            max = i;
            break;
        }
    }
    const min = (total - ((left - 1) * max) - knownTotal);
    known.push(getRandomNumber(min > max ? max : min, max));
    return getRandomDice({ total, left: left - 1, known });
};

export { getRandomDice as default };
export { getRandomDice };
