/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  URL = 'https://example.com';

  static list(data, callback){
    this.data = data;
    this.callback = callback;
    createRequest({
      url: this.URL,
      data: this.data,
      method: 'GET',
      callback: this.callback,
    });
  };

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    this.data = data;
    this.callback = callback;
    createRequest({
      url: this.URL,
      data: this.data,
      method: 'PUT',
      callback: this.callback,
    });
  };

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {
    this.data = data;
    this.callback = callback;
    createRequest({
      url: this.URL,
      data: this.data,
      method: 'DELETE',
      callback: this.callback,
    });
  };
};
