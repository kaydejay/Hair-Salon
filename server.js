const express = require ('express')
const mongoose = require ('mongoose')
const cors = require ('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(
  `mongodb+srv://Mayanwolfe:${process.env.MONGODB_PASSWORD}@cluster0.pztfz.mongodb.net/hair_salon?retryWrites=true&w=majority&appName=Cluster0`
  // ***copy and pasting mongoDB connection string to personal MongoDB w/ password; ${process.env.MONGODB_PASSWORD}
).then(() ={
  console.log('Connected successfully')
}).catch((error) => {
  console.error("Error", error)
})

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
  service: { type: String, required: true },
  stylist: { type: String, required: false },
})

const Booking = mongoose.model('Booking2', BookingSchema)

app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({date: 1})
    res.json(bookings)
  } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ message: 'Error fetching bookings' });
  }
})

app.post('/api/bookings', async (req, res) => {
  try {
    const { name, email, date, service, stylist } req.body
    const newBooking = new Booking({ name, email, date, service, stylist })
    await newBooking.save()
    res.json(newBooking)
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ message: 'Error saving booking' });
  }
})

app.listen(6000, () => {
  console.log('Server is running on port 6000')
})
