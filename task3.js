

function gradetoletter(score){
    if(score >=90) return "A";
    if(score >=80) return "B";
    if(score >=70) return "C";
    if(score >=60) return "D";
    return "F";
}

function gradetoletter2(score){
    switch(true){
        case score >=90:
            return "A";
        case score >=80:
            return "B";
        case score >=70:
            return "C";
        case score >=60:
            return "D";
        case score <60:
            return "F";
    }
}
gradetoletter(69);
gradetoletter2(79);
gradetoletter3(89);
gradetoletter(99);

function gradetoletter3(score){
    score >=90 ? "A" : score >=80 ? "B" : score >=70 ? "C" : score >=60 ? "D" : "F" ;
    
}


function processQueue(arr){
    while(arr.length > 0){
        const top = arr.shift();
        console.log(top);
    }
    console.log("Processed")
}

arr1 = [2, 3, 4, 5, 6, 7, 43, 3, 34, 34, 23, 32, 23];
processQueue(arr1);

function processQueue2(arr){
    do{
        const top = arr.shift();
        console.log(top);
    }while(arr.length > 0);
    console.log("Processed")
}

function processQueue3(arr){
    for(const[id, item] of arr){
        console.log(`processing item ${id}:`, item);
    }
}

processQueue2(arr1);
processQueue3(arr1);

function userValidation(user){
    return user.includes("@");
}

console.log(userValidation("vaisakh@1395"));

function condition(val){
    if (val > 10){
        if (val < 15){
            console.log("greater than 10");
        }
    }
}
condition(13);