//destructuring

const { count } = require("console");

// const person = {
//     firstName: "John",
//     lastName: "Doe",
//     age: 50
//   };

// let {
//       lastName:name,
//       age,
//       color="white"
// }=person

// console.log(name);


// const array = [10,20,30,40,50];

// const [value,...rest]= array;

// console.log(value);
// console.log(rest);




//classes


class Body{

    constructor(height,wieght){
        this.height=height;
        this.wieght=wieght;
    }

    count(H){
        return H-this.height;
    }

}


const res=new Body(5,70);
const valueofheight=res.count(14);
console.log(res);
console.log(valueofheight);


