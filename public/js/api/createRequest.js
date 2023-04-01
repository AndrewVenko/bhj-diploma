/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    let {url, method, data, callback} = options;
    if(method === 'GET'){
        url += url + '?';
        for(let value of Object.entries(data)){
            url += url + value[0] + '=' + value[1];
        };
    } else{
        let formData = new FormData();
        for (let value of Object.entries(obj)) {
            formData.append(value[0], value[1]);
        };
    };
    xhr.open(method, url);

    try{
        xhr.send(method === 'GET' ? null : formData);
    } catch (err){
        options.callback(xhr.err);
    };

    xhr.addEventListener('load', function(){
        options.callback(null, xhr.response);
    });
};