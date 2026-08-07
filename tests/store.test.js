
import { beforeAll, jest } from "@jest/globals";

let reducer;
let initialState;
let createStore;
let getStats;

beforeAll(async () => {

    Object.defineProperty(globalThis, "localStorage", {
        value: {
            getItem: jest.fn(() => null),
            setItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn()
        },
        writable: true
    });

    globalThis.crypto = {
        randomUUID: jest.fn(() => "123")
    };

    const store = await import("../project/src/js/store.js");

    reducer = store.reducer;
    initialState = store.initialState;
    createStore = store.createStore;
    getStats = store.getStats;
});


describe("Initial State", () => {

    test("contains an empty task list", () => {
        expect(initialState.tasks).toEqual([]);
    });

});
describe("Reducer", () => {

    test("returns same state for unknown action", () => {

        const state = reducer(initialState, {
            type: "UNKNOWN"
        });

        expect(state).toEqual(initialState);

    });

});


test("add new task", () =>{
    const state = reducer(initialState, {
        type: "ADD_TASK",
        payload: {
            title: "Testing Using Jest",
            assigned: "Mentor",
            due:"26-06-2026",
            priority: "high",
            complete: false
        }
    });
    expect(state.tasks).toHaveLength(1);
    expect(state.tasks[0].id).any(String);
    expect(state.tasks[0].status).toBe("Pending");
});

test("delete task", () =>{
    const state = {
        ...initialState,
        tasks: [
            {
                id: "1",
                title: "Task"
            }
        ]
    };
    const newState = reducer(state, {
        type: "DELETE_TASK",
        payload: "1"
    });
    expect(newState.tasks).toHaveLength(0);
});

test("marks task complete", () =>{
    const state = { 
        ...initialState,
        tasks: [
            {
                id:"1",
                status: "Pending",
                complete: false
            }
        ]
    };
    const newState = reducer(state, {
        type:"COMPLETE_TASK",
        payload: "1"
    });
    expect(newState.tasks[0].status).toBe("Completed");
    expect(newState.tasks[0].complete).toBe(true);
});

test("changes route",() => {
    const state = reducer(initialState, {
        type: "ROUTE_CHANGED",
        payload: {
            path: "./login",
            params: {}
        }
    });
    expect(state.route.path).toBe("./login");
})

describe("getStats", () =>{
    test("calculates task status", () =>{
        const stats = getStats([
            {
                status: "Completed"
            },
            {
                status: "Pending"
            },
            {
                status: "Pending"
            }
        ]);

        expect(stats.total).toBe(3);
        expect(stats.completed).toBe(1);
        expect(stats.pending).toBe(2)

    });
});

describe("Store", () => {
    test("dispatch updates state", () => {

   
    const store = createStore(initialState, reducer);
    store.dispatch({
        type: "ADD_TASK",
        payload:{
            title: "Task",
            assigned: "Me",
            due: "Today",
            priority: "High",
            complete: false
        }
    });
    expect(store.getState().tasks).toHaveLength(1);

    });
});

test("subscribe gets called", () =>{
    const store = createStore(initialState, reducer);
    const listener = jest.fn();
    store.subscribe(listener);
    store.dispatch({
        type: "ROUTE_CHANGED",
        payload: {
            path: "./login",
            params: {}
        }
    });
    expect(listener).toHaveBeenCalledTimes(1)
});