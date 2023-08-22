export default class Section {
  constructor({ items, renderer }, selector) {
    this.items = items; //array with data to add on the page
    this.renderer = renderer; //callback function to render elements' components

    this._container = document.querySelector(selector); //element to add data
  }

  renderItems() {
    this.items.forEach(element => {
      this.renderer(element);
    });
  }

  renderItem() {
    this.renderer(this.items);
  }

  addInitialItem(element) {
    this._container.append(element);
  }

  addNewItem(element) {
    this._container.prepend(element);
  }
}
