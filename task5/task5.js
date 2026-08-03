export class TypedEventEmitter {
    events = {};
    on = (event, lisstener) => {
        if (!(event in this.events)) {
            this.events[event] = [];
        }
        this.events[event].push(lisstener);
    };
    off = (event, listener) => {
        if (!(event in this.events))
            return;
        const callback = this.events[event];
        if (callback) {
            this.events[event] = callback.filter((each) => each !== listener);
        }
    };
    emit = (event, ...args) => {
        if (!(event in this.events))
            return;
        const callback = this.events[event];
        if (callback) {
            callback.map((each) => {
                each(...args);
            });
        }
    };
    once = (event, listener) => {
        const wrapper = (...arg) => {
            listener(...arg);
            this.off(event, wrapper);
        };
        if (!(event in this.events)) {
            this.events[event] = [];
        }
        const callback = this.events[event];
        if (callback) {
            callback.push(wrapper);
        }
    };
}
const userEmitter = new TypedEventEmitter();
userEmitter.on("userAdded", (payload) => {
    console.log(payload.id);
    console.log(payload.name);
});
userEmitter.on("userRemoved", () => { });
userEmitter.emit("userAdded", { id: "123", name: "Vaisakh" });
userEmitter.emit("userRemoved", "123");
