const { Client } = require('pg');

const client=new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'image',
    password: 'password',
    port: 5432,
});


client.connect()
.then(()=>{
    console.log("database connected");
})
.catch(()=>{
    console.log("error");
    
})

module.exports = {
    query: (text, params) => client.query(text, params),
    client,
};