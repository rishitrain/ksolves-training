const { Client } = require('pg');

const client=new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'productm',
    password: 'password',
    port: 5432,
});


client.connect()
.then(()=>{
    console.log("connected");
})
.catch(()=>{
    console.log("error");
    
})

module.exports = {
    query: (text, params) => client.query(text, params),
    client,
};
