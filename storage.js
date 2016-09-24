class NetFlexStorage {
  constructor() {
    this.db      = chrome.storage.sync;
    this.allKeys = 'NetFlexKeys';
  }
  addToAllKeys(key) {
    if(key != this.allKeys) {
      this.add(this.allKeys, key);
    }
  }
  getAllKeys(callback) {
    this.readEach(this.allKeys, callback);
  }
  read(key, callback) {
    this.db.get(key, data => callback(data[key] || []));
  }
  readEach(key, callback) {
    this.read(key, list => list.forEach(callback));
  }
  write(key, value) {
    let data = {};
    data[key] = value;
    this.db.set(data);
    this.addToAllKeys(key);
  }
  writeList(key, list) {
    this.write(key, Array.from(new Set(list.sort())));
  }
  add(key, value) {
    this.read(key, list => {
      list.push(value);
      this.writeList(key, list);
    });
  }
  remove(key, value) {
    this.read(key, list => {
      list.splice(list.indexOf(value), 1);
      this.writeList(key, list);
    });
  }
  toggle(k, v) {
    this.read(k, list => list.includes(v) ? this.remove(k, v) : this.add(k, v));
  }
}
