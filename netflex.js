class NetFlex {
  constructor() {
    this.reset();
    this.markup    = new NetFlexMarkup;
    this.storage   = new NetFlexStorage;
    this.messenger = new NetFlexMessage;
  }
  init() {
    this.listenMessages();
    let netFlexLoop = () => {
      !this.display && this.hideTitles();
      this.actions ? this.showActions() : this.hideActions();
      setTimeout(netFlexLoop, 300);
    }
    netFlexLoop();
  }
  reset() {
    this.display = false;
    this.actions = false;
  }
  listenMessages() {
    this.messenger.receive(msg => {
      if(msg == 'reset')   { this.reset(); }
      if(msg == 'display') { this.toggleTitles(); }
      if(msg == 'actions') { this.toggleActions(); }
    });
  }
  user() {
    let profile = this.markup.first('.profile-name');
    profile = profile || this.markup.first('li.active a');
    return profile && profile.textContent;
  }
  toggleTitles() {
    (this.display = !this.display) ? this.showTitles()  : this.hideTitles();
  }
  showTitles() {
    this.markup.show('.slider-item');
  }
  hideTitles() {
    this.storage.readEach(this.user(), title => {
      this.markup.each('[aria-label="'+title+'"]', el => {
        this.markup.hideElement(el.parentElement.parentElement);
      });
    });
  }
  toggleActions() {
    (this.actions = !this.actions) ? this.showActions() : this.hideActions();
  }
  showActions() {
    this.markup.each('.slider-item', el => {
      let title = this.cardTitle(el);
      let button = el.getElementsByClassName('netflex-toggle')[0];

      title && !button && this.addActionButton(el, title);
    });
    this.markup.onclick('.netflex-toggle', el => {
      this.markup.toggleClass(el, 'active');
      this.storage.toggle(this.user(), el.getAttribute('data-title'));
    });
    this.setActionsActive();
  }
  cardTitle(el) {
    let card = el.getElementsByClassName('title_card')[0];
    return card && card.getAttribute('aria-label');
  }
  addActionButton(el, title) {
    let button = document.createElement('button');
    button.setAttribute('class', 'netflex-toggle');
    button.setAttribute('data-title', title);
    this.markup.prepend(el, button);
  }
  setActionsActive() {
    this.storage.read(this.user(), list => {
      this.markup.each('.slider-item', el => {
        let title = this.cardTitle(el);
        let included = title && list.includes(title);

        let button = el.getElementsByClassName('netflex-toggle')[0];
        let hasClass = button && this.markup.hasClass(button, 'active');

        if(title && button && included != hasClass) {
          this.markup.toggleClass(button, 'active');
        }
      });
    });
  }
  hideActions() {
    this.markup.remove('.netflex-toggle');
  }
}

window.onload = () => new NetFlex().init();
