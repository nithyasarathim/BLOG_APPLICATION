const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/blogit-database";

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB (Fix for deprecated options)
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch((err) => console.log("❌ MongoDB Connection Error: ", err));

// Import routes
const accountRouter = require('./Routers/AccountRoute');
const subscriptionRouter = require('./Routers/SubscriptionRoute');
const blogsRouter = require('./Routers/BlogsRoute');

// Use routes
app.use('/account', accountRouter);
app.use('/subscribe', subscriptionRouter);
app.use('/blogs', blogsRouter);

// Start server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
