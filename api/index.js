import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import usersRoute from './routes/users.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();
dotenv.config();

const connect = async () => {
    try {
        const con = await mongoose.connect(process.env.MANGO);
        console.log('connected to mangoDB')
        console.log(`MongoDB Connected: ${con.connection.host}`);
    } catch (error) {
        console.log(error)
    }
}


mongoose.connection.on('disconnected', () => {
    console.log('disconnected')
});

mongoose.connection.on('connected', () => {
    console.log('connected')
});

// app.use((req, res, next) => {
//     console.log('i am middleware');
//     next()
// })


app.use(express.json());
app.use(cookieParser())

const allowedOrigins = [
  "http://localhost:3000", // CRA (Client)
  "http://localhost:5173", // Vite (Admin)
  "https://azhibookingapp.netlify.app", // Vite (Admin)
  "https://azam-booking-admin.netlify.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

app.listen(8800, () => {
    connect();
    console.log("backend connected");
})