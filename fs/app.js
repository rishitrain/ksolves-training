var fs =require('fs');

const data ="\n ak";

// fs.appendFile('prac.txt',data,function(err){
//     console.log("made !");
    
// })

fs.unlink('prac.txt',function (err){
    console.log("file deleted")
}) 



// fs.access('new.txt',function(err){
//     console.log(err ? "file not" : "file exist");
// })

const read = ()=>fs.readFile('new.txt',function(err,data){
    console.log(("data",data.toString()));
    
})


read();



// // fs.readdir('.',(err,files)=>{
// //      console.log(files);
     
// // })

// fs.watch('new.txt', (eventType, filename) => {
//     console.log(`File changed: ${filename}, Event: ${eventType}`);
// });
