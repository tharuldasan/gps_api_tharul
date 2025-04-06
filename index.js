const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample location data (dummy GPS)
let locationData = {
  lat: 6.9271, // Example latitude (Colombo, Sri Lanka)
  lon: 79.8612, // Example longitude
  heading: 180, // Example heading
};

// Route: Get current location
app.get("/get_location", (req, res) => {
  res.json(locationData);
});

// Route: Update location data
app.post("/update_location", (req, res) => {
  const { lat, lon, heading } = req.body;

  if (lat && lon && heading) {
    locationData = { lat, lon, heading };
    res.json({ message: "Location updated successfully!", locationData });
  } else {
    res.status(400).json({ error: "Invalid data" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
