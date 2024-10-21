
export const LocalStorage = {
    get: function (key, defaultValue) {
      const storageValue = localStorage.getItem(key);
      if(storageValue){
        return JSON.parse(storageValue)
      } else {
        return defaultValue
      }
    },
    set: function(key, value){
      localStorage.setItem(key, JSON.stringify(value))
    },
    existsIn: function(key, value) {
      const list = LocalStorage.get(key, []);
      return list.some(e=>e===value);

    },
    addIfNotExist: function (key, value) {
      const list = this.get(key, []);
      if (!this.existsIn(key, value)) {
          list.push(value)
      }
      this.set(key, list)
    },
    removeFromList: function (key, value) {
      const list = this.get(key, []);
      if(this.existsIn(key, value)){
          const index = list.indexOf(value)
          list.splice(index,1)
      }
      this.set(key, list)
    }

}
