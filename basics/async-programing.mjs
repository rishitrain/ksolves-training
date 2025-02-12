//async-await and fetch
import fetch from 'node-fetch';  
import { resolve } from 'path';
async function getDataFromAPI() {
  try {
    const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json');
    // console.log(response);
    
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error('Error fetching data:', err);
  }
}

getDataFromAPI();



//how the async use the promises . 
//async solves the chaining we do in promises for resolving .

//basically async function return a promise 

// function fetchData(){
//   return new Promise((resolve,reject)=>{
//     setTimeout(() => {
//       resolve('Data fetched');
//     }, 2000);
//   })
// }

// async function main() {
//   console.log("fetching data");

//   const res = await fetchData();
//     console.log(res);
// }

// main();