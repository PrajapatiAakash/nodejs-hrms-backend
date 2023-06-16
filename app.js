const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const authenticate = require('./middleware/authenticate');
const createError = require('http-errors');
const logger = require('morgan');

require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/' + process.env.DATABASE_NAME, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
    // Start your server or perform any other operations
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/auth', authRoutes);
// Protected route example
app.use('/users', authenticate, userRoutes);

// Define the error handler middleware function
const errorHandler = (err, req, res, next) => {
    console.error(err); // Log the error for debugging purposes
  
    // Set a default error status code
    const statusCode = err.statusCode || 500;
  
    // Set a default error message
    const message = err.message || 'Internal Server Error';
  
    // Send the error response
    res.status(statusCode).json({ error: message });
};
  
// Register the error handler middleware
app.use(errorHandler);

module.exports = app;
