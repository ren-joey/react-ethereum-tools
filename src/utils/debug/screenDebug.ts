/**
 * 畫面 debug 工具，用於無法使用開法者工具之平台
 * @param html - 要顯示在螢幕上的參數，將以 innerHTML 的方式貼入
 */
const screenDebug = (...html: string[]): void => {
    const div = document.createElement('div');
    div.id = 'screenDebug';
    div.setAttribute('style', `
        position: fixed;
        left: 0;
        top: 40%;
        z-index: 100;
    `);
    document.body.appendChild(div);
    div.innerHTML = html.join(', ');
};

export { screenDebug as default };
export { screenDebug };
