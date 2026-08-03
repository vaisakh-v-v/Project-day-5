interface User{
    id: string;
    name: string;
}

interface User{
    avatar: string;
    email: string;
}

const user: User = {
    id: "", email: "", name: "", avatar: ""
};

interface Array<T>{
    sum(this: Array<number>): number;
}

interface Window{
    appState: string;
}
export {}