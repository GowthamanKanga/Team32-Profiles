const express = require('express');
const router = express.Router();
const multer = require("multer")
const Park = require('../models/parkModel');
const fs = require('fs');
const path = require('path');
 

const uuid = require('uuid')
// Location where you want to store the profile Pic 
const storage = multer.diskStorage({

  destination:(req,file,callback)=>{
    callback(null,'./parkImages/')
  },
  
    filename: function(req, file, cb) {
      const uniqueFileName = `${Date.now()}-${uuid.v4()}-${file.originalname}`;
      cb(null, uniqueFileName);
  }


})

const upload = multer({storage:storage})
// Endpoint to create a new park
router.post('/', async (req, res) => {
  try {
    const { name, clientId, address, description, home, facilities, events, map } = req.body;

    const newPark = new Park({
      name,
      clientId,
      address,
      description,
      home,
      facilities,
      events,
      map
    });

    const savedPark = await newPark.save();

    res.status(201).json(savedPark);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Define the endpoint to create a new park with pages' data from a JSON file
router.post('/create-park', async (req, res) => {
    try {
      // Get the data for the new park from the request body
      const { name, clientId, address, description } = req.body;
      
      // Load the data for all the pages from a JSON file
      
      const pagesDataPath = path.resolve(__dirname, 'pages-data.json');
      const pagesData = JSON.parse(fs.readFileSync(pagesDataPath, 'utf8'));      
      // Create a new park object with the received data
      const newPark = new Park({
        name,
        clientId,
        address,
        description,
        home: pagesData.home,
        facilities: pagesData.facilities,
        events: pagesData.events,
       
      });

   
      
  
      // Save the new park to the database
      const savedPark = await newPark.save();
  
      // Send a response with the saved park object
      res.status(201).json(savedPark);
    } catch (error) {
      // Send a response with the error message if there was an error
      res.status(500).json({ message: error.message });
    }
  });
// View home data related to a park
router.get('/:parkId/home', async (req, res) => {
  try {
    const parkData = await Park.findOne({ _id: req.params.parkId });
    if (!parkData) {
      return res.status(404).json({ message: 'Home data not found' });
    }
    res.json(parkData.home);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/:parkId/Park', async (req, res) => {
  try {
    const parkData = await Park.findOne({ _id: req.params.parkId });
    if (!parkData) {
      return res.status(404).json({ message: 'Home data not found' });
    }
    res.json(parkData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update home data related to a park
router.put('/:parkId/home', upload.single('backgroundImg'), async (req, res) => {
  console.log(req.body.hours)
  // try {
  //   const parkData = await Park.findOne({ _id: req.params.parkId });
  //   if (!parkData) {
  //     return res.status(404).json({ message: 'Park data not found' });
  //   }
  //   const homeData = parkData.home
  //   homeData.title = req.body.title || homeData.title;
  //   homeData.about = req.body.about || homeData.about;
  //   homeData.events = req.body.events || homeData.events;
  //   homeData.address = req.body.address || homeData.address;
  //   homeData.description = req.body.description || homeData.description;
  //   homeData.lat = req.body.lat || homeData.lat;
  //   homeData.lng = req.body.lng || homeData.lng;
  //   homeData.info = req.body.info || homeData.info;
  //   homeData.hours = req.body.hours || homeData.hours;
  //   homeData.clientId = req.body.clientId || homeData.clientId;
  //   homeData.backgroundImg = req.file.backgroundImg || homeData.backgroundImg; // use the path of the uploaded file

  //   const updatedParkData = await parkData.save();
  //   res.json(updatedParkData.home);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: 'Server error' });
  // }
});


// Get all facilities for a park
router.get('/parks/:parkId/facilities', async (req, res) => {
  try {
    const park = await Park.findById(req.params.parkId);
    if (!park) {
      return res.status(404).json({ error: 'Park not found' });
    }

    const facilities = await Facility.find({ park: park._id });
    res.json(facilities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a facility for a park
router.put('/parks/:parkId/facilities/:facilityId', async (req, res) => {
  try {
    const park = await Park.findById(req.params.parkId);
    if (!park) {
      return res.status(404).json({ error: 'Park not found' });
    }

    const facility = await Facility.findOneAndUpdate(
      { _id: req.params.facilityId, park: park._id },
      req.body,
      { new: true }
    );
    if (!facility) {
      return res.status(404).json({ error: 'Facility not found' });
    }

    res.json(facility);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});
// GET events for a specific park
router.get('/:parkId/events', async (req, res) => {
  try {
    const park = await Park.findById(req.params.parkId);
    if (!park) {
      return res.status(404).json({ message: 'Park not found' });
    }
    const events = await Event.find({ park: park._id });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;

 

