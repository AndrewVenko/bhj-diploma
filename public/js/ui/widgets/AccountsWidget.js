/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if(!element) {
      throw new Error('Пустой элемент!');
    };
    this.element = element;
    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   **/
  registerEvents() {
    this.element.addEventListener('click', (event) => {
      if(event.target.closest('.create-account')) {
        App.getModal('createAccount').open();
      } else if(event.target.closest('.account')) {
        this.onSelectAccount(event.target.closest('.account'));
      };
    });
  }
  

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    const user = User.current();
    if(user){
      Account.list(user, (err, response) => {
        if(response && response.success){
          this.clear();
          const list = response;
          for(let element of list.data){
            this.renderItem(element);
          };
        };
      });
    };
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const account = document.querySelectorAll('.account');
    const arraysAccount = Array.from(account);
    for(let element of arraysAccount){
      element.remove();
    };
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( event ) {
    const account = document.querySelectorAll('.account');
    const arraysAccount = Array.from(account);
    for(let item of arraysAccount){
      if(item.classList.contains('active')){
        item.classList.remove('active');
      };
    };
    event.closest('.account').classList.add('active');
    const accountId = event.closest('.account').getAttribute('data-id');
    App.showPage( 'transactions', { account_id: accountId });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    return `
    <li class="account" data-id="${item.id}">
      <a href="#">
         <span>${item.name}</span> /
         <span>${item.sum} ₽</span>
      </a>
    </li>
    `;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(data));
  };
}