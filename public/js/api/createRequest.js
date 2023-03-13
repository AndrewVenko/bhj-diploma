/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    let url = options.url,
        method = options.method,
        data = options.data,
        callback = options.callback;
    xhr.responseType = 'json';
    if(method === 'GET'){
        url += url + '?';
        for(let value of Object.entries(data)){
            url += url + value[0] + '=' + value[1];
        };
        xhr.addEventListener('load', function(callback){
            try{
                if(xhr.status !== 200){
                    alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
                } else if(xhr.readyState === xhr.DONE){
                    callback('null', xhr.response);
                };
            } catch (err){
                callback(xhr.err);
            };
        });
    } else{
        let formData = new FormData();
        for (let value of Object.entries(obj)) {
            formData.append(value[0], value[1]);
        };
        xhr.open(method, url);
        xhr.send(formData);
        xhr.addEventListener('load', function(callback){
            try{
                if(xhr.status !== 200){
                    alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
                } else if(xhr.readyState === xhr.DONE){
                    callback('null', xhr.response);
                };
            } catch (err){
                callback(xhr.err);
            };
        });
    };
};