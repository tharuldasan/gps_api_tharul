const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Storage for Live GPS Data
let locationData = { lat: null, lon: null, heading: null };

// Route: Get Current GPS Location
app.get("/get_location", (req, res) => {
  if (locationData.lat && locationData.lon) {
    res.json(locationData);
  } else {
    res.status(404).json({ error: "No GPS data available yet." });
  }
});

// Route: ESP32 Sends GPS Data
app.post("/update_location", (req, res) => {
  const { lat, lon, heading } = req.body;

  if (lat && lon && heading) {
    locationData = { lat, lon, heading };
    res.json({ message: "GPS data received!", locationData });
  } else {
    res.status(400).json({ error: "Invalid GPS data format." });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
