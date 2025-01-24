const express = require('express');
const users = require('./MOCK_DATA (1).json');
const app = express();
const port = 8000;

 app.use((req, res, next) => {
    const start = Date.now();  
    const { method, url } = req; 
     console.log(`[${new Date().toISOString()}] ${method} ${url}`);

     const originalSend = res.send;
    res.send = function (body) {
        const duration = Date.now() - start;  
        console.log(`[${new Date().toISOString()}] Response sent in ${duration}ms`);
        return originalSend.call(this, body); 
    };

    next(); 
});

app.use(express.json());

app.get('/users', (req, res) => {
   res.send(users);
});

app.post('/users', (req, res) => {
    const body = req.body;
    console.log(body);
    res.status(201).json({ message: 'User created successfully', user: body });
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === userId);
    
    if (index !== -1) {
        users.splice(index, 1);
        return res.status(200).json({ message: 'User deleted successfully' });
    }
    
    res.status(404).json({ message: 'User not found' });
});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updatedUser = req.body;
  
    const index = users.findIndex(user => user.id === userId);
  
    if (index !== -1) {
        users[index] = { id: userId, ...updatedUser };
        return res.status(200).json({ message: 'User updated successfully', user: users[index] });
    }
  
    res.status(404).json({ message: 'User not found' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
