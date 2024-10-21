const express = require("express");
const users = require('./MOCK_DATA.json');
const fs = require('fs');


const app = express();
const port = 3000;

//Middleware
app.use(express.urlencoded({extended: false}));

//routes

//Server side rendering
app.get('/users', (req, res) => {
    const html = `
    <ul>
     ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html);
})


//Rest API

//Client side rendering
app.get('/api/users', (req, res) => {
    return res.json(users);
})

app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);
    }).patch((req, res) => {
        const userId = Number(req.params.id);  
        const updatedData = req.body;            
        const user = users.find(user => user.id === userId);
      
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }
       
        Object.keys(updatedData).forEach(key => {
          if (user.hasOwnProperty(key)) {        
            user[key] = updatedData[key];        
          }
        });
        
        res.status(200).send({ message: 'User updated successfully', user });      
    }).delete((req, res) => {
        const userId = Number(req.params.id);
        if (isNaN(userId)) {
            return res.status(400).json({ status: 'fail', message: 'Invalid user ID' });
        }
        const userIndex = users.findIndex(user => user.id === userId); 
        if (userIndex === -1) {
            return res.status(404).json({ status: 'fail', message: 'User not found' });
        }
        users.splice(userIndex, 1);
        res.json({ status: 'success', message: 'User deleted successfully' });

    });

app.post('/api/users', (req, res) => {
    const { first_name, last_name, email, gender, 'Job Title': jobTitle } = req.body;
    const newUser = {
        id: users.length + 1,
        first_name,
        last_name,
        email,
        gender,
        'Job Title': jobTitle
    };
    users.push(newUser);
    fs.writeFile('./MOCK_DATA.Json', JSON.stringify(users), (err, data) => {
        res.json({ status: 'success', id: users.length });
    }); 
});




app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

