/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  URL = 'https://example.com/user';

  static setCurrent(user) {
    const userData = "{\"id\":" + `${user.id}` + ",\"name\":" + "\"" + `${user.name}` + "\"}";
    localStorage.user = userData;
  };

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    const current = this.current();
    if(current !== undefined){
      localStorage.removeItem(current);
    };
  };

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    const userData = localStorage.user;
    if(userData !== undefined){
      const current = JSON.parse(userData);
      return current;
    } else{
      return undefined;
    };
  };

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    const response = callback;
    if(response.success === true){
      this.setCurrent({
        "id": response.user.id,
        "name": response.user.name,
      });
    } else{
      this.unsetCurrent();
      alert(response.error);
    };
    createRequest({
      url: this.URL + '/current',
      method: 'GET',
      data: {
        email: response.user.email,
        password: response.user.password,
      },
      callback: callback,
    });
  };

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        };
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    const response = callback;
    if(response.success === true){
      data = {
        name: response.user.name,
        email: response.user.email,
        password: response.user.password,
      };
      this.setCurrent({
        id: response.user.id,
        name: response.user.name,
      });
      createRequest({
        url: this.URL + '/register',
        method: 'POST',
        data: {
          email: response.user.email,
          password: response.user.password,
        },
        callback: callback,
      });
    } else{
      if(response.email !== undefined && response.password !== undefined){
        alert(response.email, response.password);
      } else if(response.email !== undefined){
        alert(response.email);
      } else if(response.password !== undefined){
        alert(response.password);
      };
    };
  };

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    const response = callback;
    if(response.success){
      createRequest({
        url: this.URL + '/logout',
        method: 'POST',
        data: {
          email: response.user.email,
          password: response.user.password,
        },
        callback: callback,
      });
      this.unsetCurrent();
    } else{
      alert('Ошибка!');
    };
  };
};
