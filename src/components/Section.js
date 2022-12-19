export default class Section {
  // массив данных и функция отрисовки, второй параметр - селектор контейнера
  constructor({ items = [], renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  // метод добавления DOM-элемента в контейнер
  addItem(element) {
    this._container.prepend(element);
  }

  // отрисовка всех элементов
  renderItems() {
    this._initialArray.forEach((item) => {
      this._element = this._renderer(item);
    });
  }
}
