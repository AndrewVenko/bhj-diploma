/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    let {url, method, data, callback} = options;
    let formData = new FormData();
    if(method === 'GET' && data !== undefined){
        url += '?';
        for(let entry of Object.entries(data)) {
            url += entry[0] + '=' + entry[1];
        };
    } else if (data !== undefined) {
        for (let entry of Object.entries(data)) {
            formData.append(entry[0], entry[1]);
        };
    };
    xhr.open(method, url);

    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            callback(null, xhr.response);
        } else {
            callback(new Error(`Request failed: ${xhr.status} ${xhr.statusText}`));
        };
    });

    xhr.addEventListener('error', () => {
        callback(new Error('Network Error'));
    });


    try{
        xhr.send(method === 'GET' ? null : formData);
    } catch (err){
        callback(err);
    };
};