const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({
  
  image: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  capacity: { type: Number, required: true },
  price: { type: Number, required: true },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const EventsSchema = new mongoose.Schema({
    park: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Park',
   
    },
    events :[ {
      type: eventSchema,
      required: true
    }],
    // events: [{
        
    //         image: { type: String, required: true },
    //         name: { type: String, required: true },
    //         date: { type: String, required: true },
    //         time: { type: String, required: true },
    //         location: { type: String, required: true },
    //         description: { type: String, required: true },
    //         capacity: { type: Number, required: true },
    //         price: { type: Number, required: true },
    //         bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
           
    // }]
  });
//   const EventsSchema = mongoose.model('Event', EventSchema);
module.exports = EventsSchema;
 