export class TypedEventEmitter<Events extends Record<string, any[]>>{
    events: {[K in keyof Events]?: ((...args: Events[K]) => void) [] } = {};
    on = <K extends keyof Events>(
        event: K,
        lisstener: (...args: Events[K]) => void,
    ): void => {
        if(!(event in this.events)){
            this.events[event] = [];
        }
        this.events[event]!.push(lisstener);
    };
    off = <K extends keyof Events>(
        event: K,
        listener: (...args: Events[K]) => void,
    ) => {
        if(!(event in this.events)) return;
        const callback = this.events[event];
        if(callback){
            this.events[event] = callback.filter((each) => each !== listener);
        }
    };
    emit = <K extends keyof Events>(event: K, ...args: Events[K]) =>{
        if(!(event in this.events)) return;
        const callback = this.events[event];
        if(callback){
            callback.map((each) => {
                each(...args);
            });
        }
    };

    once = <K extends keyof Events>(
        event: K,
        listener: (...args: Events[K]) => void,
    ) =>{
        const wrapper = (...arg: Events[K]) =>{
            listener(...arg);
            this.off(event,wrapper);
        };
        if(!(event in this.events)){
            this.events[event] = [];
        }
        const callback = this.events[event];
        if(callback){
            callback.push(wrapper);
        }
    };

}

type User = {
    id: string;
    name: string;
}
type UserEvents = {
    userAdded: [User];
    userRemoved: [string];
    userUpdated: [string, Partial<User>];
};

const userEmitter = new TypedEventEmitter<UserEvents>();

userEmitter.on("userAdded", (payload) =>{
    console.log(payload.id);
    console.log(payload.name);
});

userEmitter.on("userRemoved", () => {});
userEmitter.emit("userAdded", {id: "123", name: "Vaisakh"});
userEmitter.emit("userRemoved", "123");
export {};