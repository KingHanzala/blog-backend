require('dotenv').config();
const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api', authRoutes);
app.use('/api', postRoutes);
app.use('/api', subscriptionRoutes);

module.exports.handler = serverless(app);
