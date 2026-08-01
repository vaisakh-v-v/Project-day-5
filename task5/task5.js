// Type-Safe State Manager
// 640. Convert Week 4 state manager: createStore<S, A extends { type: string }>(initialState: S,
// reducer: (state: S, action: A) => S)
// 641. dispatch must only accept valid action types: dispatch(action: A)
// 642. subscribe: (listener: (state: S) => void): () => void
// 643. Write a typed reducer for the Kanban board with discriminated union actions: ADD_CARD,
// REMOVE_CARD, MOVE_CARD
export const initialState = {
    route: {
        path: "/",
        params: {},
    },
    tasks: [],
};
export function getSavedState() {
    try {
        const item = localStorage.getItem("task-manager-state");
        return item ? JSON.parse(item) : null;
    }
    catch {
        return null;
    }
}
const savedState = getSavedState();
export function reducer(state, action) {
    switch (action.type) {
        case "ROUTE_CHANGED":
            return {
                ...state,
                route: action.payload,
            };
        case "ADD_TASK": {
            const updatedTasks = [
                ...state.tasks,
                {
                    id: crypto.randomUUID(),
                    ...action.payload,
                    status: "Pending",
                    complete: false,
                },
            ];
            return { ...state, tasks: updatedTasks };
        }
        case "DELETE_TASK": {
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            };
        }
        case "COMPLETE_TASK": {
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload
                    ? { ...task, status: "Completed", complete: true }
                    : task)
            };
        }
        default:
            return state;
    }
}
export function createStore(initialState, reducer) {
    let state = initialState;
    const listeners = [];
    return {
        getState() {
            return state;
        },
        dispatch(action) {
            state = reducer(state, action);
            localStorage.setItem("task-manager-state", JSON.stringify(state));
            listeners.forEach((listener) => listener(state));
        },
        subscribe(listener) {
            listeners.push(listener);
            return () => {
                const index = listeners.indexOf(listener);
                if (index > -1)
                    listeners.splice(index, 1);
            };
        },
    };
}
export const store = createStore(savedState || initialState, reducer);
export function getStats(tasks) {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.status === "Completed").length;
    return { total, completed, pending: total - completed };
}
