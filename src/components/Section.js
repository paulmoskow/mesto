export default class Section {
  constructor({ renderer }, selector) {
    this.renderer = renderer; //callback function to render elements' components
    this._container = document.querySelector(selector); //element to add data
  }

  renderItems(items) {
    items.forEach(element => {
      this.renderer(element);
    });
  }

  appendItem(element) {
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element);
  }
}



