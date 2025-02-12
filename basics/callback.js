//simple callback 

// function func1(name,callback){
//       console.log(`${name}`,"greet");
//       callback();
      
// }

// function func2(){
//     console.log("hello i am there ");

// }

// func1("Ak" , func2);



// //settimeout 

function getdata(callback){
    setTimeout(()=>{
          const data={name:"rishi"};
          callback(data);
    },2000)
}

function process(data){
    console.log(data,"data recieved")
}

getdata(process)