import utils from '../interface';
import { getRandomNumber } from './getRandomNumber';

/**
 * 取得隨機座標，此座標點會圍繞在 window 的外圍
 * @returns 隨機座標點 {@link utils.Offset | 格式參考}
 */
const getRandomOffsetOuter = (): utils.Offset => {
    const offset: utils.Offset = {
        top: 0,
        left: 0
    };
    if (getRandomNumber(0, 1) === 0) {
        offset.top = (getRandomNumber(0, 1) * 120 - 10) / (100 * window.innerHeight);
        offset.left = getRandomNumber(-10, 110) / (100 * window.innerWidth);
    } else {
        offset.top = getRandomNumber(-10, 110) / (100 * window.innerHeight);
        offset.left = (getRandomNumber(0, 1) * 120 - 10) / (100 * window.innerWidth);
    }
    return offset;
};

export { getRandomOffsetOuter as default };
export { getRandomOffsetOuter };
