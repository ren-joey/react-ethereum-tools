import utils from '../interface';

/**
 * javascript element 定位搜尋器
 * @param dom - 目標 Dom
 * @param parent - 指定的定位目標，預設為畫面 document.scrollingElement
 * @returns 包含 top, left 的物件
 * {@link utils.TopAndLeft | 參考介面}
 */
const offsetFinder = (
    dom: HTMLElement,
    parent: (HTMLElement|undefined) = undefined
): utils.TopAndLeft => {
    const rect = dom.getBoundingClientRect();
    const doc = (parent) || (document.scrollingElement) || document.documentElement;

    // QA-7 IE,UC瀏覽器支援性修正
    const scrollTop = doc.scrollTop || window.pageYOffset;
    const scrollLeft = doc.scrollLeft || window.pageYOffset;

    return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
    };
};

export { offsetFinder as default };
export { offsetFinder };
