export {};
function identity<T>(arg: T): T {
    return arg;
}

console.log(typeof identity<number>(4));

function first<T>(arr: T[]): T | undefined{
    return arr[0];
}

async function fetchData<T>(url:string): Promise<T>{
    const res = await fetch(url);
    const data: T = await res.json();
    return data;
}
function getProperty<T,K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

type Student = {
    name: string;
    class:string;
    rollNo: string;
};

const student: Student = {
    name:"Vaisakh",
    class:"12th",
    rollNo:"61",
};

console.log(getProperty(student,"name"));

class Queue<T>{
    container: Array<T> = [];
    enqueue(item: T){
        this.container.push(item);
    }
    dequeue(): T | undefined{
        return this.container.shift();
    }
    peek(): T | undefined{
        return this.container[0];
    }
    isEmpty(): boolean{
        return this.container.length === 0;
    }
}