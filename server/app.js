const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/blogit-database";

app.use(cors({ origin: '*' })); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log("Error occurred: ", err));

const accountRouter = require('./Routers/account');
const subscriptionRouter = require('./Routers/subscription');

app.use('/account', accountRouter);
app.use('/subscribe', subscriptionRouter);

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
