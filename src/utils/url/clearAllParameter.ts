/**
 * 網址參數清除器
 * @param url - 目標 url (預設值為當前網址)
 * @returns 清除參數後的完整網址
 */
const clearAllParameter = (url: string = window.location.href): string => {
    const urlparts = url.split('?');
    return urlparts[0];
};

export { clearAllParameter as default };
export { clearAllParameter };
