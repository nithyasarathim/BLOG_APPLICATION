const express = require('express');    
const mongoose = require('mongoose'); 
const cors = require('cors'); 
const url = "mongodb://localhost:27017/blogit-database"; 

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected');
        console.log('Database has been created.');
    })
    .catch((err) => {
        console.log("Error occurred: ", err);
    });

const myRouter = require('./Routers/account');
app.use('/account', myRouter); 

app.listen(8000, () => {
    console.log("Server started on http://localhost:8000");
});
