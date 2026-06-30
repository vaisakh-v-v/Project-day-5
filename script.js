class Shape{
    constructor(name , color){
        this.name=name;
        this.color=color;
    }
     describe() {
        console.log("shape class");
    }
    static compare(a,b){
        return a.area() > b.area()? a : b;
    }
}

class Circle extends Shape{
    constructor(name,color , radius){
        super(name,color)
        this.radius=radius;
    }
    area(radius){
        return 3.14*radius*radius;
    }
    perimeter(radius){
        return 2*3.14*radius;

    }
    describe(){
        console.log("this is a Circle");
    }

}

class Rectangle extends Shape{
    constructor(w, h,name,color){
        super(name,color)
        this.w = w;
        this.h = h;
    }
     describe(){
        console.log("this is a Triangle");
    }
    area(w, h){
        return w*h;
    }
    perimeter(w,h){
        return 2*(w+h);
    }

}

class Triangle extends Shape{
    constructor(base,height,name,color){
        super(name,color)
        this.base = base;
        this.height = height;
    }
    area(base,height){
        return 0.5*base*height;
    }
    describe(){
        console.log("this is a Rectangle");
    }
}


const triangle = new Triangle(10 , 10 , "t1" , "red");
console.log(triangle.area());
triangle.describe();

const rectangle = new Rectangle(10 , 18 , "r1" , "red");
console.log(rectangle.area());
rectangle.describe();

const circle1 = new Circle(235 , "c1" , "red");
console.log(circle1.area());
circle1.describe();

const circle2 = new Circle(20 , "c2" , "red");
console.log(circle2.area());
circle2.describe();

console.log(Shape.compare(circle1,circle2));


class shapeCollection{
    collections = [];
    display(){
        console.log(this.collections);
    }
    add(shape){
        this.collections.push(shape);
    }

    getById(id){
        for(let collection of this.collections){
            if(collection.name  === id){
                return collection;
            }
        }
    }

    getByType(type){
        for(let collection of this.collections){
            if(collection.constructor.name  === type){
                return collection;
            }
        }
    }

    getTotalArea(){
        let totalarea = 0;
        this.collections.forEach((collection) => {
            totalarea +=  collection.area();
        });
        return totalarea;
    }
    sortByArea(){
        this.collections.sort(Shape.compare);
    }

    removeById(id){
        let obj = this.getById(id);
        let index = this.collections.indexOf(obj);
        this.collections.splice(index, 1);
    }
}

shapeCollection = new shapeCollection();
shapeCollection.add(rectangle);
shapeCollection.add(triangle);
shapeCollection.display();
console.log(shapeCollection.getById("r1"));
console.log(shapeCollection.getTotalArea());
shapeCollection.add(circle1);
shapeCollection.add(circle2);
shapeCollection.sortByArea();
shapeCollection.display();
console.log(shapeCollection.getByType("circle1"));
console.log(circle1 instanceof Shape);
console.log(Object.getPrototypeOf(rectangle));
console.log(circle2.constructor.name);
