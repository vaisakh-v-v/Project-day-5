// Type-Safe State Manager
// 640. Convert Week 4 state manager: createStore<S, A extends { type: string }>(initialState: S,
// reducer: (state: S, action: A) => S)
// 641. dispatch must only accept valid action types: dispatch(action: A)
// 642. subscribe: (listener: (state: S) => void): () => void
// 643. Write a typed reducer for the Kanban board with discriminated union actions: ADD_CARD,
// REMOVE_CARD, MOVE_CARD

export type State = {
    route: Route;
    tasks: Task[];
}

export type Route = {
    path: string;
    params: Record<string , string>;
}

export type Task = {
    id: string;
    title: string;
    assigned: string;
    due: string;
    priority: string;
    complete: boolean;
    status: "Pending" | "Completed";
}

export const initialState: State = {
    route: {
        path: "/",
        params: {},
    },
    tasks: [

    ],
};
export function getSavedState() : State | null {
    try{
        const item = localStorage.getItem("task-manager-state")
        return item ? (JSON.parse(item) as State) : null;
    } catch {
        return null;
    }
}

const savedState = getSavedState();


export type Action = 
| {type: "ROUTE_CHANGED"; payload: Route}  
| {type: "ADD_TASK"; payload: Omit<Task, "id" | "status" | "complete">}
| {type: "DELETE_TASK"; payload: string;}
| {type: "COMPLETE_TASK"; payload:string ;}
 
export function reducer(state:State, action: Action) : State {
   switch (action.type) {
      case "ROUTE_CHANGED":
            return {
                ...state,
                route: action.payload,
            };
        case "ADD_TASK": {
            const updatedTasks: Task[] = [
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
                tasks: state.tasks.map(task => 
                    task.id === action.payload
                        ? { ...task, status: "Completed", complete: true }
                        : task
                )
            };
        }
        default:
            return state;
    }

}
export function createStore<S, A>(
    initialState: S,
    reducer: (state: S, action: A) => S
) {
    let state = initialState;
    const listeners: ((state: S) => void)[] = []

    return {
        getState() : S {
            return state;
        },
        dispatch(action: A): void{
            state = reducer(state, action);
            localStorage.setItem("task-manager-state", JSON.stringify(state));
            listeners.forEach((listener) => listener(state));
        },
        subscribe(listener: (state: S) => void): () => void{
            listeners.push(listener);
            return () => {
                const index = listeners.indexOf(listener);
                if(index > -1) listeners.splice(index, 1);
            };
        },
    };
}

export const store = createStore<State, Action>(savedState || initialState , reducer);

export type Stats = {
    total: number,
    completed: number,
    pending: number;
}

export function getStats(tasks: Task[]): Stats {
    const total = tasks.length;
    const completed = tasks.filter(
        (task) => task.status === "Completed"
    ).length
    return {total , completed, pending: total-completed}
}