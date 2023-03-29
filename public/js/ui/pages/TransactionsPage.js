/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if(!element){
      throw new Error('Пустой элемент!');
    };
    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render();
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const accountRemove = document.querySelector('.remove-account');
    const transactionRemove = document.querySelector('.transaction__remove');
    accountRemove.addEventListener('click', () => {
      this.removeAccount();
    });
    transactionRemove.addEventListener('click', () => {
      this.removeTransaction(transactionRemove.dataset.id);
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
    if(this.lastOptions){
      if(confirm('Вы действительно хотите удалить счёт?')){
        App.updateWidgets();
        App.updateForms();
      };
    };
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
    if(confirm('Вы действительно хотите удалить эту транзакцию?')){
      if(Transaction.remove(id, (err, response) => {
        if(response.success === true){
          App.update();
        }
      }));
    };
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    if(options){
      this.lastOptions = options;
      const dataAccount = Account.get();
      if(dataAccount){
        this.renderTransactions(this.renderTitle());
      };
    };
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = '';
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    const title = document.querySelector('.content-title');
    title.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    const arraysMonths = [
      'январь',
      'февраль',
      'март',
      'апрель',
      'май',
      'июнь',
      'июль',
      'август',
      'сентябрь',
      'октябрь',
      'ноябрь',
      'декабрь',
    ];
    const dateFix = `${data.slice(8,10)} + ' ' + ${arraysMonths[+data.slice(5,7) - 1]} + ' ' + ${data.slice(0,4)} + ' г.' + ' в ' + ${data.slice(11,16)}`
    return dateFix;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    `<div class="transaction transaction_${item.type} row">
     <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>
          <div class="transaction__date">${this.formatDate(item.created_at)}</div>
      </div>
     </div>
     <div class="col-md-3">
      <div class="transaction__summ">
          ${item.sum} <span class="currency">₽</span>
      </div>
     </div>
     <div class="col-md-2 transaction__controls">
        <button class="btn btn-danger transaction__remove" data-id="${data.id}">
            <i class="fa fa-trash"></i>  
        </button>
     </div>
   </div>`
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    const content = document.querySelector('.content');
    const arr = data;
    for(let objectData of arr){
      content.insertAdjacentHTML('beforeend', `
      <div class="content-wrapper">
        <section class="content-header">
          <h1>
            ${objectData.name}
          </h1>
        </section>
        <section class="content">
         ${this.getTransactionHTML(objectData)}
        </section>
      </div>
      `)
    }
  }
}