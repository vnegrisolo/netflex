class NetFlexPopup {
  constructor() {
    this.markup    = new NetFlexMarkup;
    this.storage   = new NetFlexStorage;
    this.messenger = new NetFlexMessage;
  }
  init() {
    this.showLists();
    this.messenger.send('reset');

    this.markup.onclick('.netflex-toggle', el => {
      this.markup.toggleClass(el, 'active');
      this.messenger.send(el.getAttribute('data-message'));
    });
  }
  showLists() {
    let lists = this.markup.first('#netflex-lists');
    lists.innerHTML = '';

    this.storage.getAllKeys(user => {
      let list = document.createElement('ol');

      this.storage.readEach(user, item => {
        let node = document.createElement('li');
        node.appendChild(document.createTextNode(item));
        list.appendChild(node);
      });

      lists.appendChild(document.createTextNode(user));
      lists.appendChild(list);
    });
  }
}

window.onload = () => new NetFlexPopup().init();
