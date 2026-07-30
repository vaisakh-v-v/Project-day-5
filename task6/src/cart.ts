interface CartItem {
  id: string;
  content: string | undefined;
  quantity: number;
  price: number;
}

const CartModule = (function () {
  let items: Array<CartItem> = [];

  return {
    addItem: ({
      id = crypto.randomUUID(),
      content,
      quantity = 1,
      price = 100,
    }: Partial<CartItem>): void => {
      items.push({ id, content, quantity, price });
    },
    removeItem: (id: string): void => {
      items = items.filter((each) => each.id !== id);
    },
    updateQuantity: (id: string, quantity: number): void => {
      const item: undefined | CartItem = items.find((each) => each.id === id);

      item && (item.quantity = quantity);
    },
    getItems: (): Array<CartItem> => {
      return items;
    },
    getTotal: (): number => {
      return items.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
    },
    clear: (): void => {
      items = [];
    },
  };
})();

const item: Partial<CartItem> = { content: "Soap", quantity: 4, price: 70 };
const item2: Partial<CartItem> = { content: "Foot-ball", quantity: 1, price: 700 };
CartModule.addItem(item);
// CartModule.addItem(item2);
console.log(CartModule.getItems());
console.log(CartModule.getTotal());
const removalID= CartModule.getItems()[0]?.id
if(removalID) CartModule.removeItem(removalID);

console.log(CartModule.getItems());
console.log(CartModule.getItems());