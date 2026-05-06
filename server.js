
const envConfig = require('dotenv').config();
const envConfigExpand = require('dotenv-expand');

envConfigExpand.expand(envConfig);

const app  = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.APP_PORT || 3000;

// Connect to MongoDB
connectDB(); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

});
