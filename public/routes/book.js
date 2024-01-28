// public/routes/book.js
const express = require('express');
const path = require('path');
const { readData, writeData } = require('../js/dataHelper'); // Adjust the import path

const route = express.Router();

// Function to handle CRUD operations and history
function handleTourOperations(req, res, next) {
  const data = readData();

  // Implement CRUD operations and history feature here...
  const { tourId, action } = req.body;

  // Find the tour by ID
  const tourIndex = data.findIndex(tour => tour.id === tourId);
  const tour = data[tourIndex];

  if (!tour) {
    return res.status(404).send({ message: 'Tour not found' });
  }

  // Implement CRUD operations based on the "action" parameter
  switch (action) {
    case 'edit':
      // Implement update operation
      // For example, update the tour's details
      tour.details = req.body.updatedDetails;
      break;

    case 'delete':
      // Implement delete operation
      // For example, soft delete the tour and add it to history
      const deletedTour = { ...tour, deletedAt: new Date() };
      data.splice(tourIndex, 1); // Remove the tour from the main data array
      data.push(deletedTour); // Add the deleted tour to history
      break;

    // Add other CRUD cases as needed

    default:
      return res.status(400).send({ message: 'Invalid action' });
  }

  writeData(data); // Save the updated data to the JSON file

  res.send({ message: 'Operation successful', data });
}

// Handle CRUD operations and history feature for the "Edit tour" button
route.post('/edit-tour', handleTourOperations);

module.exports = route;
