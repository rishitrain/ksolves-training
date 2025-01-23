// const person = {fname:"John", lname:"Doe", age:25};

// let text="";

// for(let x in person){
//     text+=person[x];
// }
// console.log(text);


//function



//  function login(username){
//     console.log(`${username}`,"loggged");
// }

// login("rishi");



// function cal(...nums){//rest operator , wrap value in one 
//       return nums;
// }

// console.log(cal(200,900,98));


//this eXAMPLE ;

// const car = {type:"Fiat", model:"500", color:"white",
//     myfunc:function(){
//         console.log(`${this.type}`);
        
//     }

// };

// console.log(car);

// car.type="tata";

// console.log(car);



//arrow function

const add=(n,m)=>{
    console.log(n+m);
    
}

add(1,8);