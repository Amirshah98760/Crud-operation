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