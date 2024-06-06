require('dotenv').config();
const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURL = process.env.MONGODB_URL_LOCAL; // Replace 'mydatabase' with your database name

// Debug: Log the MongoDB URL to ensure it is loaded correctly
console.log('MongoDB URL:', mongoURL);

if (!mongoURL) {
    console.error('MongoDB URL is not defined. Please check your .env file or environment variables.');
    process.exit(1);
}

// Set up MongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB server');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

// Define event listeners for database connection
db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Export the database connection
module.exports = db;
