// Create server 
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const partnerRoutes = require('./routes/partner.routes');
const cors = require('cors');
const app = express();


//using cors to handle cors errors
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
//middleware to read and store cookies 
app.use(cookieParser());
//middleware to read data in JSON format, coming from frontend 
app.use(express.json());


// middlware to approve APIs for routes, we can use prefix also.
app.use('/api/auth', authRoutes);

// middleware to approve Authenticated APIs
app.use('/api/food', foodRoutes);
app.use('/api/partners', partnerRoutes);

module.exports = app;