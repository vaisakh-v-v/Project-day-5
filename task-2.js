var x = 10;
var x= 23;
x = 30;
console.log(x);

let y = 32;
y = 34;
console.log(y);

const z = 2;
console.log(z);

if(true){
    var a = 1;
    let b = 2;
    const c =3;

}

function outerfun(){
    const outerVar="I am from outer fun";
        function middlefun(){
            const middleVar="I am from middle fun";  
                function innerfun(){
                    const innerVar="I am from ininer fun";
                    console.log(outerVar);
                    console.log(middleVar);
                    console.log(innerVar);
        } 
        innerfun();
        }
        middlefun();
}
    outerfun();

console.log(myVarVariable); 
var myVarVariable = "Hello";
console.log(myVarVariable); 



try {
  console.log(myLetVariable); 
} catch (error) {
  console.error(error.name + ": " + error.message); 
}

let myLetVariable = "Hello from let!";
console.log(a);

