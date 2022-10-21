/**
 * 網址參數取得器
 * @param name - 要尋找的目標參數名稱
 * @param url - 目標 url (預設值為當前網址)
 * @returns 結果參數值
 */
const getParameterByName = (
    name: string,
    url: string = window.location.href
): (string | null) => {
    const formatName = name.replace(/[[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${formatName}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export { getParameterByName as default };
export { getParameterByName };
