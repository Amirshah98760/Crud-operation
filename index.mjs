import express from 'express'

const app = express();
const PORT = 3000;

app.use(express.json());

// Array to store data 
let userArray = [];


const findUserById = (id) =>{\
    return userArray.find(user => user.id === id);
}

// Get request to fetch all users 

app.get('/user', (req, res)=>{
res.status(200).json(userArray);
});


// POST request to create a new user
app.post('/users', (req, res) => {
    const { id, name, description } = req.body;

   
    if (!id || !name) {
        return res.status(400).json({ message: 'ID and name are required' });
    }

  
    if (findUserById(id)) {
        return res.status(400).json({ message: 'User with this ID already exists' });
    }

    const newUser = { id, name, description: description || '' };
    userArray.push(newUser);
    res.status(201).json(newUser);
});

// PUT request to update an existing user
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = findUserById(id);

    if (user) {
       
        const { name, description } = req.body;
        user.name = name !== undefined ? name : user.name;
        user.description = description !== undefined ? description : user.description;

        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});


