class Node {
  constructor(value, next) {
    this.value = value;
    if (!next) this.next = null;
    else this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  insertAtHead(value) {
    const newNode = new Node(value);
    // soit la list est vide DONC newNode devient la tail et la tete
    if (this.size === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.size++;
    // soit la list n'est pas vide DONC newNode devient la nouvelle head et l'ancienne devient sont suivant
  }

  insertAtTail(value) {
    // soit la list est vide et donc on appel insertAtHead
    if (this.size === 0) {
      this.insertAtHead(value);
    } else {
      const newNode = new Node(value);
      this.tail.next = newNode;
      this.tail = newNode;
      this.size++;
    }
    // soit la list n'est pas vide et donc le nouveau noeud devient le next de tail et tail pointe sur le nouveau noeud
  }

  find(predicate) {
    let listCopy = this.head;

    while (listCopy !== null) {
      if (predicate(listCopy.value)) return listCopy;
      listCopy = listCopy.next;
    }
    return null;
  }

  remove(value) {
    let present = this.head;
    let precedent = present;

    // Si le noeud supprimer est la tete alors la tete point sur le next
    // Si le noeud supprimer est en plein milieu de la list, on touche pas la head ny la tail
    // Si le noeud supprimer est en last alors la tail pointe sur le precedent
    while (present !== null) {
      if (present.value === value) {
        if (this.head === present) {
          this.head = present.next;
        } else if (this.tail === present) {
          this.tail = precedent;
          precedent.next = null;
        } else {
          precedent.next = present.next;
        }
        return true;
      }
      precedent = present;
      present = present.next;
    }
    return false;
  }

  toArray() {
    let allValues = [];
    let node = this.head;

    while (node) {
      allValues.push(node.value);
      node = node.next;
    }
    return allValues;
  }
}

// const main = () => {
//   const ll = new LinkedList();
//   ll.insertAtHead("test1");
//   ll.insertAtHead("test2");
//   ll.insertAtHead("test3");
//   ll.insertAtHead("test4");
//   ll.insertAtHead("test5");
//   ll.insertAtHead("test6");
//   ll.insertAtHead("test7");
//   ll.insertAtTail(1);
//   ll.insertAtTail(2);
//   ll.insertAtTail(3);
//   ll.insertAtTail(4);
//   ll.insertAtTail("eg");
//   ll.insertAtHead("Tete");
//   console.log(ll.toArray());
//   ll.remove("test3");
//   console.log(ll.toArray());
// };

// main();

export { Node, LinkedList };
