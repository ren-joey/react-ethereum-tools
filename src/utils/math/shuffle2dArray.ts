/* eslint-disable @typescript-eslint/no-explicit-any */

import { getRandomNumber } from './getRandomNumber';

/**
 * 將一個二維陣列，隨機打散
 * @param arr - 欲打散的陣列
 * @returns 打散後的陣列
 */
const shuffle2DArray = (arr: any[]): any[] => {
    const maxArr: number[] = arr.map((each) => each.length);
    const newArr: any[][] = [];

    for (let i = 0; i < arr.length; i += 1) {
        while (arr[i].length > 0) {
            const target = arr[i].splice(0, 1)[0];
            let randomRow = getRandomNumber(0, maxArr.length - 1);

            if (!newArr[randomRow]) newArr[randomRow] = [];

            const getLength = () => {
                const length = newArr[randomRow].filter((cols) => cols !== undefined).length;
                return length;
            };

            while (getLength() >= maxArr[randomRow]) {
                randomRow = (randomRow + 1) % maxArr.length;
                if (!newArr[randomRow]) newArr[randomRow] = [];
            }

            let randomCol = getRandomNumber(0, maxArr[randomRow] - 1);
            while (newArr[randomRow][randomCol] !== undefined) {
                randomCol = (randomCol + 1) % maxArr[randomRow];
            }

            newArr[randomRow][randomCol] = target;
        }
    }

    return newArr;
};

/**
 * 將一個二維陣列，隨機打散
 * 能將陣列打散前 match 的指定位置
 * 該位置會出現在打散後 selected 的指定位置
 * @param arr - 欲打散的陣列
 * @param selectedRowPos - 打散後目標要放置的 y 位置
 * @param selectedColPos - 打散後目標要放置的 x 位置
 * @param matchRowPos - 打散前要選的目標 y
 * @param matchColPos - 打散前要選的目標 x
 * @returns 打散後的陣列
 *
 * @example
 *  arr = [
 *      [1, 2, 3],
 *      [4, 5, 6],
 *      [7, 8, 9*]
 *  ];
 *  selectedRowPos = 2;
 *  selectedColPos = 2; // 正中心
 *  matchRowPos = 3;
 *  matchColPos = 3; // "9" 指定要放在打散後的正中心
 *  return [
 *      [2, 8, 6],
 *      [7, 9*, 3],
 *      [1, 5, 4]
 *  ]
 */
const shuffle2DArrayWithPos = (
    arr: any[],
    selectedRowPos: number,
    selectedColPos: number,
    matchRowPos: number,
    matchColPos: number
): any[] => {
    const cloneArr: any[] = JSON.parse(JSON.stringify(arr));
    const maxArr: number[] = cloneArr.map((each) => each.length);
    const newArr: any[][] = [];

    const targetValue: any[] = cloneArr[matchRowPos].splice(matchColPos, 1)[0];
    newArr[selectedRowPos] = [];
    newArr[selectedRowPos][selectedColPos] = targetValue;

    for (let i = 0; i < cloneArr.length; i += 1) {
        while (cloneArr[i].length > 0) {
            const target = cloneArr[i].splice(0, 1)[0];
            let randomRow = getRandomNumber(0, maxArr.length - 1);

            if (!newArr[randomRow]) newArr[randomRow] = [];

            const getLength = () => {
                const length = newArr[randomRow].filter((cols: any) => cols !== undefined).length;
                return length;
            };
            while (getLength() >= maxArr[randomRow]) {
                randomRow = (randomRow + 1) % maxArr.length;
                if (!newArr[randomRow]) newArr[randomRow] = [];
            }

            let randomCol = getRandomNumber(0, maxArr[randomRow] - 1);
            while (newArr[randomRow][randomCol] !== undefined) {
                randomCol = (randomCol + 1) % maxArr[randomRow];
            }

            newArr[randomRow][randomCol] = target;
        }
    }

    return newArr;
};

export { shuffle2DArray as default };
export { shuffle2DArray, shuffle2DArrayWithPos };
