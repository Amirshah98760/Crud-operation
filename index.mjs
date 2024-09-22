import express from 'express';

const app = express();
const port = 3000;


app.use(express.json());


let userArray = [
    { id: 1, name: "Amin Khan", description: "A dedicated software engineer." },
    { id: 2, name: "Omar Farooq", description: "A project manager." }
];

// Helper function to find user by ID
const findUserById = (id) => {
    return userArray.find(user => user.id === id);
};

// GET request to fetch all users
app.get('/users', (req, res) => {
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

// DELETE request to remove a user
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = userArray.findIndex(user => user.id === id);

    if (index !== -1) {
        const deletedUser = userArray.splice(index, 1);
        res.status(200).json(deletedUser);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
