//async-await and fetch
import fetch from 'node-fetch';  
async function getDataFromAPI() {
  try {
    const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json');
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error('Error fetching data:', err);
  }
}

getDataFromAPI();


