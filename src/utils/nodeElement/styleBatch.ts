/* no-param-reassign */
/* cSpell:ignore csstype */

export function keys<O extends object>(obj: O): Array<keyof O> {
    return Object.keys(obj) as Array<keyof O>;
}

/**
 * 批次樣式修改器
 * @param doms - 目標 dom，以陣列或字串傳送
 * @param style - 欲改變的 style
 */
const styleBatch = (
    doms: string|HTMLElement|(string|HTMLElement)[],
    style: CSSStyleDeclaration
): void => {
    const stylePaster = (dom: HTMLElement) => {
        keys(style).forEach((key) => {
            (dom.style as any)[key] = style[key];
        });
    };

    if (Array.isArray(doms)) {
        for (let i = 0; i < doms.length; i += 1) {
            let dom: string|HTMLElement = doms[i];
            if (typeof dom === 'string') dom = document.querySelector(dom) as HTMLElement;
            stylePaster(dom);
        }
    } else if (typeof doms === 'string') {
        const dom = document.querySelector(doms) as HTMLElement;
        stylePaster(dom);
    } else {
        stylePaster(doms);
    }
};

export { styleBatch as default };
export { styleBatch };
