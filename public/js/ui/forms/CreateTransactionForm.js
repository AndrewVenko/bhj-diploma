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
    Account.list(this.element, (err, response) => {
      if(response && response.success){
        if(this.element === document.querySelector('#new-expense-form')){
          const select = document.querySelector('#expense-accounts-list');
          select.innerHTML = '';
          for(let element of select){
           select.insertAdjacentHTML('beforeend', `
           <option value="${element.id}">${element.name}</option>
           `);
          };
        } else{
          const select = document.querySelector('#income-accounts-list');
          select.innerHTML = '';
          for(let element of select){
           select.insertAdjacentHTML('beforeend', `
           <option value="${element.id}">${element.name}</option>
           `);
          };
        };
      };
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if(response && response.success){
        App.getModal('transactions').close();
        App.update();
      };
    });
  };
}