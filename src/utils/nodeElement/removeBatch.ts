/**
 * 批次刪除 nodeElement
 * @param domArray - 不同的項目用逗號分隔開來
 */
const removeBatch = (...domArray: HTMLElement[]): void => {
    domArray.forEach((dom) => {
        if (!dom) return;
        try {
            dom.remove();
        } catch (e) {
            if (dom.parentElement) dom.parentElement.removeChild(dom);
        }
    });
};

export { removeBatch as default };
export { removeBatch };
