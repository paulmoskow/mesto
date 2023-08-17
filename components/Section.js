export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items; //array with data to add on the page
    this._renderer = renderer; //callback function to render elements' components

    this._container = document.querySelector(selector); //element to add data
  }

  renderItems() {
    this._items.forEach(element => {
      this._renderer(element);
    });
  }

  renderItem() {
    this._renderer(this._items);
  }

  addInitialItem(element) {
    this._container.append(element);
  }

  addNewItem(element) {
    this._container.prepend(element);
  }
}
