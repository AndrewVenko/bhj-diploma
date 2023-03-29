/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element){
    if(!element){
      throw new Error('Пустой элемент!');
    };
    this.element = element;
    this.registerEvents();
  };

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    const dismissElements = document.querySelectorAll('div[data-dismiss="modal"]');
    const arrayDismissElements = Array.from(dismissElements);
    const element = this.element;
    for(let item of arrayDismissElements){
      let parent = item.closest('#' + element.id);
      if(parent){
        item.addEventListener('click', (item) =>{
          this.onClose(item);
        });
      };
    };
   /*  this.element.firs
    data-dismiss
    modal */
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose(e) {
    this.e.close();
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.style.display = 'block';
  };
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close(){
    this.element.style.display = 'none';
  };
}