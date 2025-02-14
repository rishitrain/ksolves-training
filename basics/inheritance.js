// class Parent {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
// }

// class Child extends Parent {
//     speak() {
//         console.log(`${this} is my parent class`);
//     }
// }

//  const obj = new Parent("Rishi", 21);

//  const obj1 = new Child("Amit", 18);

// obj1.speak();  


const a={
   name:"rishi",
   sleep(){
    this.istrue="true";
   }
}

const b={
   age:12
}

b.__proto__=a;
console.log(b.name);
// console.log(b.sleep);

b.sleep();
console.log(b.istrue);
console.log(a.istrue);