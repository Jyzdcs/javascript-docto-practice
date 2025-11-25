class HashMap {
  constructor() {
    this.hashMap = {};
  }

  set(key, value) {
    this.hashMap[key] = value;
  }

  get(key) {
    return this.hashMap[key];
  }

  has(key) {
    return this.hashMap[key] !== undefined;
  }

  delete(key) {
    if (this.hashMap[key] !== undefined) {
      delete this.hashMap[key];
      return true;
    }
    return false;
  }
}

class HashSet {
  constructor() {
    this.hashSet = [];
    this.index = 0;
  }

  add(value) {
    for (let i = 0; this.hashSet[i]; i++) {
      if (this.hashSet[i] === value) return;
    }
    this.hashSet[this.index] = value;
    this.index++;
  }

  has(value) {
    for (let i = 0; this.hashSet[i]; i++) {
      if (this.hashSet[i] === value) return true;
    }
    return false;
  }

  delete(value) {
    for (let i = 0; this.hashSet[i]; i++) {
      if (this.hashSet[i] === value) {
        this.hashSet.splice(i, 1);
        return true;
      }
    }
    return false;
  }
}

// const main = () => {
//   const hashMap = new HashMap();

//   hashMap.set("a", 1);
//   console.log(hashMap);
//   // console.log(hashMap.get("a"));
//   console.log(hashMap.has("a"));
//   console.log(hashMap.delete("a"));
//   console.log(hashMap.has("a"));
//   console.log(hashMap);
// };

// main();

export { HashMap, HashSet };
