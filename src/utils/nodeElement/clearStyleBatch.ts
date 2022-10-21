/**
 * 批次清除標籤上的 style, 此方法會掠過 backgroundImage
 * @param domArray - 不同的項目用逗號分隔開來
 */
const clearStyleBatch = (...domArray: HTMLElement[]): void => {
    for (let i = 0; i < domArray.length; i += 1) {
        const dom = domArray[i];
        dom.setAttribute('style', '');
    }
};

export { clearStyleBatch as default };
export { clearStyleBatch };
