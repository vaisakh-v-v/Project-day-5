function processesInput(value: string|number|boolean|null|undefined): void{
    if(value == null){
        console.log("Value is null or undefined");
        return;
    }

    if(typeof value === "string"){
        console.log("String length:", value.length);
    }
    else if(typeof value === "number"){
        console.log("square of the number is : ", value*value);
    }
    else if(typeof value === "boolean"){
        if(value === true) console.log("Value representes true");
        else console.log("Boolean is strictly false");
    }
}

interface User{
    id: number;
    name: string;
    email: string;
    isActive: Boolean;
}

function isUser(value: unknown): value is User{
    if(typeof value !== "object" || value === null){
        return false;
    }
    const candidate = value as Record<string, unknown>;
    return(
        typeof candidate.id === "number" &&
        typeof candidate.name === "string" &&
        typeof candidate.email === "string" &&
        typeof candidate.isActive === "boolean"
    );
}

async function fetchUser(apiUrl:string){
    try{
        const response = await fetch(apiUrl);
        const data: unknown = await response.json();
        if(isUser(data)){
            console.log(`Success! User ID: ${data.id}, Name:${data.name}`);
        }else {
            console.error("API validation failed: Data does not match User schema.");
        }
    }catch(error){
        console.log("Network error:", error);
    }
}

const validUrlMock = 'data:application/json,{"id":102,"name":"Vaisakh V", "email":"vaiskah@gmail.com", "isActive":true }';
// const invalidUrlMock = 'data:a'

async function runTests(){
    await fetchUser(validUrlMock);
}
runTests();

type shape = | {kind: 'circle'; radius: number} | {kind: 'rect'; w: number; h:number};

function getArea(shape: shape): number{
    switch (shape.kind){
        case'circle':
            return Math.PI*shape.radius**2;
        
        case 'rect':
            return shape.w * shape.h;
        
        default:{
            const _exhaustiveCheck: never = shape;
            return _exhaustiveCheck
        }
    }
}

const circ: shape = {kind:"circle", radius: 5};
const circleArea = getArea(circ);
console.log(`the area value is: ${circleArea}`);