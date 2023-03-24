/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    let {url, method, data, callback} = options;
    xhr.responseType = 'json';
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

    try{
        if(method === 'GET'){
            xhr.open(method, url);
            xhr.send();
        } else{
            xhr.open(method, url);
            xhr.send(formData);
        };  
    } catch (err){
        callback(xhr.err);
    };

    xhr.addEventListener('load', function(){
        options.callback(null, xhr.response);
    });
};