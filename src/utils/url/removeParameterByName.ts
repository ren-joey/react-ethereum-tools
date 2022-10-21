/**
 * 網址參數移除器
 * @param parameter - 要刪除的參數名稱
 * @param url - 目標 url (預設值為當前網址)
 * @returns 清除指定參數後的網址
 */
const removeParameterByName = (
    key: string,
    sourceURL: string = window.location.href
) => {
    let rtn = sourceURL.split('?')[0],
        param,
        params_arr = [];
    const queryString = (sourceURL.indexOf('?') !== -1) ? sourceURL.split('?')[1] : '';
    if (queryString !== '') {
        params_arr = queryString.split('&');
        for (let i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split('=')[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        if (params_arr.length) rtn = rtn + '?' + params_arr.join('&');
    }
    return rtn;
};

export { removeParameterByName as default };
export { removeParameterByName };
