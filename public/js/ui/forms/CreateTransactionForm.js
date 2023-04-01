const { response } = require("express");

/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const list = Account.list(() => {
      let select;
    this.element.id === 'new-expense-form' ? select = document.querySelector('#expense-accounts-list') : select = document.querySelector('#income-accounts-list');
    select.textContent = '';
    });
    const arrayList = Array.from(list);

    for(let element of arrayList){
      select.insertAdjacentHTML('beforeend', `
      <option value="${element.id}">${element.name}</option>
      `);
    };
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if(response.success === true){
        App.update();
      };
    });
  };
}