/**
 * 兩個 new Date 時間比較器
 * @param currentDate - 當前時間
 * @param targetDate - 目標時間
 * @returns 0|1|-1
 *      0 未過目標時間
 *      1 已過目標時間
 *      -1 與目標時間相同
 */
const dateChecker = (
    currentDate: Date,
    targetDate: Date
): number => {
    if (currentDate.valueOf() > targetDate.valueOf()) return 1;
    if (currentDate.valueOf() < targetDate.valueOf()) return 0;
    return -1;
};

export { dateChecker as default };
export { dateChecker };
