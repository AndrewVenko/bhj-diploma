/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  URL = this.URL + '/account';
  /**
   * Получает информацию о счёте
   * */
  static get(id = '', callback){
    this.id = id;
    this.callback = callback;
    createRequest({
      id: this.id,
      url: this.URL,
      method: 'GET',
      callback: this.callback(err, ressponse),
    });
  };
};