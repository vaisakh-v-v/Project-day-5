const CartModule = (function () {
    let items = [];
    return {
        addItem: ({ id = crypto.randomUUID(), content, quantity = 1, price = 100, }) => {
            items.push({ id, content, quantity, price });
        },
        removeItem: (id) => {
            items = items.filter((each) => each.id !== id);
        },
        updateQuantity: (id, quantity) => {
            const item = items.find((each) => each.id === id);
            item && (item.quantity = quantity);
        },
        getItems: () => {
            return items;
        },
        getTotal: () => {
            return items.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
        },
        clear: () => {
            items = [];
        },
    };
})();
const item = { content: "Soap", quantity: 4, price: 70 };
const item2 = { content: "Foot-ball", quantity: 1, price: 700 };
CartModule.addItem(item);
CartModule.addItem(item2);
console.log(CartModule.getItems());
console.log(CartModule.getTotal());
const removalID = CartModule.getItems()[0]?.id;
if (removalID)
    CartModule.removeItem(removalID);
console.log(CartModule.getItems());
console.log(CartModule.getItems());
export {};
//# sourceMappingURL=cart.js.map