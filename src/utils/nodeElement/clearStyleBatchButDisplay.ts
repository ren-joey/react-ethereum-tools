/**
 * 批次清除標籤上的 style，保留 display 及 backgroundImage
 * @param domArray - 不同的項目用逗號分隔開來
 */
const clearStyleBatchButDisplay = (...domArray: HTMLElement[]): void => {
    for (let i = 0; i < domArray.length; i += 1) {
        const dom = domArray[i];
        const { backgroundImage } = dom.style;
        const { display } = dom.style;
        dom.setAttribute('style', '');
        if (backgroundImage) dom.style.backgroundImage = backgroundImage;
        if (display) dom.style.display = display;
    }
};

export { clearStyleBatchButDisplay as default };
export { clearStyleBatchButDisplay };
