const mongoose = require('mongoose');

function connectDB() {
  
  const mongoURI = process.env.MONGO_URI;
  mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected successfully -', process.env.DATABASE_NAME)
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
    process.exit(1); // Exit the process with failure   
  });
}

module.exports = connectDB; 