/**
 * 批次隱藏 nodeElement
 * @param domArray - 要隱藏的 dom 對象，可傳入 querySelector
 */
const hideBatch = (...domArray: (HTMLElement|string)[]): void => {
    for (let i = 0; i < domArray.length; i += 1) {
        let dom = domArray[i];
        if (dom) {
            dom = (typeof dom === 'string')
                ? document.querySelector(dom) as HTMLElement
                : dom as HTMLElement;
            dom.style.display = 'none';
        }
    }
};

hideBatch();

export { hideBatch as default };
export { hideBatch };
