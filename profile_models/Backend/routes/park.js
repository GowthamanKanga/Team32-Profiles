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
const storageDOc = multer.diskStorage({

  destination:(req,file,callback)=>{
    callback(null,'./documents/')
  },
  
    filename: function(req, file, cb) {
      const uniqueFileName = `${Date.now()}-${uuid.v4()}-${file.originalname}`;
      cb(null, uniqueFileName);
  }


})


// Create a multer middleware to parse the request body
const upload2 = multer({storage:storageDOc} );
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
 router.get("/:parkId/home/background", (req, res) => {
    
  
 Park.findOne({ _id: req.params.parkId })
      .then((park) => {

        const fileName = park.home.backgroundImg;

        console.log(fileName)
        try {
          const filePath = path.join(__dirname, "..", "parkImages", fileName);
       
          fs.stat(filePath, (err, stat) => {
            if (err) {
              console.error(`Error: ${err.message}`);
              return res.status(400).send("Error: " + err.message);
            }
    
            if (!stat.isFile()) {
              console.error(`Error: ${filePath} is not a file`);
              return res.status(400).send(`Error: ${filePath} is not a file`);
            }
    
            res.sendFile(filePath);
          });
        } catch (err) {
          console.error(`Error: ${err.message}`);
          return res.status(400).send("Error: " + err.message);
        }
      })
      .catch((error) => {
        res.status(500).send({ error });
      });
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
router.get('/:parkId/facilities', async (req, res) => {
  try {
    const parkData = await Park.findOne({ _id: req.params.parkId });
    if (!parkData) {
      return res.status(404).json({ message: 'Home data not found' });
    }
    res.json(parkData.facilities.facilities);
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
router.get('/:parkId/events', async (req, res) => {
  try {
    const parkData = await Park.findOne({ _id: req.params.parkId });
    if (!parkData) {
      return res.status(404).json({ message: 'Park data not found' });
    }
    res.json(parkData.events.events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Update home data related to a park
router.put('/:parkId/home', upload.single('backgroundImg'), async (req, res) => {

  const  data = req.body
  const cleanData = {
    title: data.title.replace(/\\/g, '').replace(/"/g, ''),
    about: data.about.replace(/\\/g, '').replace(/"/g, ''),
    events: data.events.replace(/\\/g, '').replace(/"/g, ''),
    
    info: data.info.map(str => JSON.parse(str)),

    hours: data.hours.map((hour) => {
      const parsedHour = JSON.parse(hour);
      return {
        day: parsedHour.day,
        time: parsedHour.time
      };
    }),
 
  };
  
 


  
  try {
    const parkData = await Park.findOne({ _id: req.params.parkId });
    if (!parkData) {
      return res.status(404).json({ message: 'Park data not found' });
    }
    const homeData = parkData.home
    homeData.title = cleanData.title || homeData.title;
    homeData.about = cleanData.about || homeData.about;
    homeData.events = cleanData.events || homeData.events;
    // homeData.address = cleanData.address || homeData.address;
    // homeData.description = cleanData.description || homeData.description;
    // homeData.lat = cleanData.lat || homeData.lat;
    // homeData.lng = cleanData.lng || homeData.lng;
    homeData.info = cleanData.info || homeData.info;
    homeData.hours = cleanData.hours || homeData.hours;
    homeData.clientId = cleanData.clientId || homeData.clientId;
  
    if (req.file && req.file.filename) { 
      console.log(req.file.filename)
    homeData.backgroundImg = req.file.filename  // use the path of the uploaded file
    }
    const updatedParkData = await parkData.save();
    res.json(updatedParkData.home);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/:parkId/facImg', async (req, res) => {
  try {
    const park = await Park.findOne({ _id: req.params.parkId });
    if (!park) {
      return res.status(404).json({ message: 'Park data not found' });
    }

    const facilities = park.facilities.facilities
    const facilitiesWithImages = await Promise.all(
      facilities.map(async (facility) => {
        const imagePath =  `uploads/${facility.image}`; 
        return { ...facility.toObject(), image: imagePath };
      })
    );
   
    res.json(facilitiesWithImages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:parkId/eventImg', async (req, res) => {
  try {
    const park = await Park.findOne({ _id: req.params.parkId });
    if (!park) {
      return res.status(404).json({ message: 'Park data not found' });
    }

    const events = park.events.events
    const eventWithImg = await Promise.all(
      events.map(async (event) => {
        const imagePath =  `uploads/${event.image}`; 
        return { ...event.toObject(), image: imagePath };
      })
    );
    console.log(eventWithImg)
    res.json(eventWithImg);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');

  }
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
router.put('/:parkId/facilities',upload.single('image'), async (req, res) => {
  const parkId = req.params.id;
 

  try {
    const park = await Park.findOne({ _id: req.params.parkId });
    if (!park) {
      return res.status(404).json({ message: 'Park data not found' });
    }
    const filePath = req.file.filename;
    const equipmentData = req.body.equipment.map((equipmentString) => JSON.parse(equipmentString));

    const newFacility = {
      image: filePath,
      name: req.body.name,
      description: req.body.description,
      description: req.body.location,
      capacity: parseInt(req.body.capacity),
      equipment: equipmentData,
      visitors: {
        max: parseInt(req.body.visitors.max),
        min: parseInt(req.body.visitors.min)
      }
    };
    park.facilities.facilities.push(newFacility);

    const updatedPark = await park.save();
    res.json(updatedPark);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.put('/:parkId/event',upload.single('image'), async (req, res) => {
  

  try {
    const park = await Park.findOne({ _id: req.params.parkId });
    if (!park) {
      return res.status(404).json({ message: 'Park data not found' });
    }
    const eventData = {
      image: req.file.filename,
      name: req.body.name,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      location: req.body.location,
      description: req.body.description,
      numTickets: parseInt(req.body.numTickets),
    };
  
    console.log(eventData)
    park.events.events.push(eventData);

    const updatedPark = await park.save();
    res.json(updatedPark);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.put('/:parkId/event/update', upload.single('image'),async (req, res) => {
  try {
    const park = await Park.findOne({ _id: req.params.parkId });
    if (!park) {
      return res.status(404).json({ message: 'Park data not found' });
    }
    const eventId = req.body._id;
    const eventIndex = park.events.events.findIndex(event => event._id.toString() === eventId);
    if (eventIndex < 0) {
      return res.status(404).json({ message: 'Event data not found' });
    }
    let img = ""
    if (req.file){
     img = req.file.filename}
    const eventData = {
      image: img,
      name: req.body.name,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      location: req.body.location,
      description: req.body.description,
      numTickets: parseInt(req.body.numTickets),
    };
    park.events.events[eventIndex] = eventData;

    const updatedPark = await park.save();
    res.json(updatedPark);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
router.delete('/:parkId/events', async (req, res) => {
  try {
    const park = await Park.findOne({ _id: req.params.parkId });
    if (!park) {
      return res.status(404).json({ message: 'Park data not found' });
    }

    const eventId = req.body._id;
    const eventIndex = park.events.events.findIndex(event => event._id.toString() === eventId);

    if (eventIndex === -1) {
      return res.status(404).json({ message: 'Event not found' });
    }

    park.events.events.splice(eventIndex, 1);

    const updatedPark = await park.save();
    res.json(updatedPark);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
// Define the endpoint to create a new park with pages' data from a JSON file
// Define the endpoint to create a new park and request
router.post('/create-park-and-request', upload2.fields([
  { name: 'land_title_deed', maxCount: 1 },
  { name: 'purchase_agreement', maxCount: 1 },
  { name: 'zoning_by_laws', maxCount: 1 },
  { name: 'building_permits', maxCount: 1 },
]), async (req, res) => {
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
 
    // Get the file objects from the request
    const { land_title_deed, purchase_agreement, zoning_by_laws, building_permits } = req.files;

    // Create a new request object with the received data and the IDs of the newly created park
    const newRequest = new Request({
        clientId,
        parkId: savedPark._id,
        land_title_deed: land_title_deed[0].filename,
        purchase_agreement: purchase_agreement[0].filename,
        zoning_by_laws: zoning_by_laws[0].filename,
        building_permits: building_permits[0].filename,
      
      
    });

    // Save the new request to the database
    const savedRequest = await newRequest.save();

    // Send a response with the saved park and request objects
    res.status(201).json({ park: savedPark, request: savedRequest });
  } catch (error) {
    // Send a response with the error message if there was an error
    res.status(500).json({ message: error.message });
  }
});
router.delete('/:parkId/facility',upload.none(), async (req, res) => {
  
  try {
    const park = await Park.findOne({ _id: req.params.parkId });
    if (!park) {
      return res.status(404).json({ message: 'Park data not found' });
    }
console.log(req.body._id)
    const facilityId = req.body._id;
    const facilityIndex = park.facilities.facilities.findIndex(facility => facility._id.toString() === facilityId);

    if (facilityIndex === -1) {
      return res.status(404).json({ message: 'facility not found' });
    }

    park.facilities.facilities.splice(facilityIndex, 1);

    const updatedPark = await park.save();
    res.json(updatedPark);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
/// get method for admin to see all documents
router.get('/requests', async (req, res) => {
  try {
    const requests = await Request.find();
    const requestsWithDocs = await Promise.all(
      requests.map(async (request) => {
        const docs = [];
        for (const doc of request.docs) {
          const docPath = `uploads/${doc.filename}`;
          docs.push({ ...doc.toObject(), path: docPath });
        }
        return { ...request.toObject(), docs };
      })
    );
    res.json(requestsWithDocs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Define the endpoint to accept/reject a request and update the corresponding park
router.put('/accept-request/:requestId', async (req, res) => {
  try {
    const { accepted } = req.body;
    const request = await Request.findById(req.params.requestId);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    request.accepted = accepted;
    await request.save();
    
    // Update the corresponding park's accepted status if the request is accepted
    if (accepted) {
      const park = await Park.findById(request.park_id);
      if (!park) {
        return res.status(404).json({ message: 'Park not found' });
      }
      park.accepted = true;
      await park.save();
    } else {
      // Delete the corresponding park if the request is rejected
      await Park.deleteOne({ _id: request.park_id });
    }

    res.json({ message: 'Request updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/parks/:clientId', async (req, res) => {
  try {
    const clientId = req.params.clientId;

    // Find all parks with the given clientId
    const parks = await Park.find({ clientId });

    // Send a response with the parks
    res.json(parks);
  } catch (error) {
    // Send a response with the error message if there was an error
    res.status(500).json({ message: error.message });
  }
});
router.put('/:parkId/facility/update', upload.single('image'), async (req, res) => {
  

  try {
    
    const park = await Park.findOne({ _id: req.params.parkId });
    if (!park) {

      return res.status(404).json({ message: 'Park data not found' });
    }
    const facilityId = req.body._id;
    const facilityIndex = park.facilities.facilities.findIndex(facility => facility._id.toString() === facilityId);
    if (facilityIndex < 0) {
      return res.status(404).json({ message: 'Facility data not found' });
    }
    let img = "";
    if (req.file) {
      img = req.file.filename;
    }
    const equipmentData = req.body.equipment.map((equipmentString) => JSON.parse(equipmentString));
    const facilityData = {
      image: img,
      name: req.body.name,
      description: req.body.description,
      description: req.body.location,
      capacity: parseInt(req.body.capacity),
      equipment: equipmentData,
      visitors: {
        max: parseInt(req.body.visitors.max),
        min: parseInt(req.body.visitors.min)
      }
    };
    park.facilities.facilities[facilityIndex] = facilityData;

    const updatedPark = await park.save();
    res.json(updatedPark);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

 

