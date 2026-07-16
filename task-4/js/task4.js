const cartModule = (function () {
  let items = [];

  return {
    addItem(id, name, price, quantity = 1) {
      const existingItem = items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        items.push({ id, name, price, quantity });
      }
    },
    removeItem(id) {
      items = items.filter((item) => item.id !== id);
    },

    updateQuantity(id, quantity) {
      if (quantity <= 0) {
        this.removeItem(id);
        return;
      }
      const item = items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    getItems() {
      return JSON.parse(JSON.stringify(items));
    },
    getTotal() {
      return items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    },

    clear() {
      items = [];
    },
  };
})();

cartModule.addItem(1, "pen", 10);
console.log(cartModule.getItems());

cartModule.removeItem(1);
console.log(cartModule.getItems());

cartModule.addItem(1, "pen", 10);
console.log(cartModule.getItems());

cartModule.updateQuantity(1, 20);
console.log(cartModule.getItems());

cartModule.clear();
console.log(cartModule.getItems());
