import { string2Number } from '../stringFormat/string2Number';

/**
 * 取得 dom 包含 margin 的總高度
 * @param dom - {@link HTMLElement | 介面參考}
 */
const getOuterHeight = (dom: HTMLElement): number => {
    const elm = dom;
    const { getComputedStyle } = window;
    const computedStyle = getComputedStyle(elm, null);
    const elmHeight = string2Number(computedStyle.height);
    const elmMarginTop = string2Number(computedStyle.marginTop);
    const elmMarginBottom = string2Number(computedStyle.marginBottom);
    const elmMargin = Number(elmMarginTop) + Number(elmMarginBottom);

    return Number(elmHeight) + elmMargin;
};

export { getOuterHeight as default };
export { getOuterHeight };
