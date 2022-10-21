import { offsetFinder } from './offsetFinder';

/**
 * 將 nodeElement 複製並以 fixed 定位貼到 body 中
 * @param target - 要複製的目標 nodeElement
 * @param zIndex - 指定的 z-index 層級，預設為 1
 * @returns 返回複製的 jQuery dom 對象
 */
const copyPasteFixed = (
    target: HTMLElement,
    zIndex = 1
): HTMLElement => {
    const offset = offsetFinder(target);
    const clone = target.cloneNode(true) as HTMLElement;
    clone.setAttribute('style', `
    position: fixed;
    left: ${offset.left}px;
    top: ${offset.top}px;
    width: ${target.offsetWidth}px;
    height: ${target.offsetHeight}px;
    'z-index': ${zIndex};
    `);
    document.body.appendChild(clone);
    return clone;
};

export { copyPasteFixed as default };
export { copyPasteFixed };
