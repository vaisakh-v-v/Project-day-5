abstract class Shape{
    abstract area(): number;
    abstract perimeter(): number;
    describe(){
        console.log(`This is a ${this}`);
    }
    static create(type: "circle" | "rect" | "triangle", ...args: number[]){
        switch(type){
            case "circle":
                return new circle(...(args as [number]));
            case "rect":
                return new Rectangle(...(args as [number, number]));
            
            case "triangle":
                return new Triangle(...(args as [number, number]));
        }

    }
}
class circle extends Shape{
    private radius: number;
    constructor(radius: number){
        super();
        this.radius = radius;
    }
    area(): number{
        return Math.PI*Math.pow(this.radius, 2);
    }
    perimeter(): number {
        return 2 * Math.PI * this.radius;
    }
}

class Rectangle extends Shape{
    private l: number;
    private b: number;
    constructor(l: number, b: number){
        super();
        this.l = l;
        this.b = b;
    }

    area(): number{
        return this.l * this.b;
    }

    perimeter(): number {
         return 2 * (this.l + this.b);
    }
}

class Triangle extends Shape{
    private b: number;
    private h: number;
    constructor(b: number, h: number){
        super();
        this.b = b;
        this.h = h;
    }
    area(): number{
        return (this.b * this.h) / 2;
    }
    perimeter(): number {
        return(
            this.b*(2 * Math.sqrt(this.h * this.h + ((this.b / 2) * this.b) / 2))
        );
    }
}

const Circle = Shape.create("circle", 12);
console.log(Circle instanceof circle);
export {};