const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile'); // Added jsonfile package

const app = express();
const port = process.env.PORT || 3000;

app.use("/public/css", express.static(path.resolve(__dirname, 'public', 'css')))
app.use("/public/images", express.static(path.resolve(__dirname, 'public', 'images')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const homeRoute = require('./public/routes/home');
const bookRoute = require('./public/routes/book');

app.use('/home', homeRoute);
app.use('/book', bookRoute);

// Add the following code for CRUD operations and history feature
const dataFilePath = 'data.json';

// Function to read data from JSON file
function readData() {
  try {
    return jsonfile.readFileSync(dataFilePath);
  } catch (error) {
    return [];
  }
}

// Function to write data to JSON file
function writeData(data) {
  try {
    jsonfile.writeFileSync(dataFilePath, data, { spaces: 2 });
  } catch (error) {
    console.error('Error writing to data file:', error);
  }
}

// Implement CRUD operations and history feature here...

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
