require('dotenv').config({path: './config.env'})
const express  = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors')
var cookieParser = require('cookie-parser')
const connectMongoDB = require('./config/db');
const errorHandler = require('./middlewares/error')


// Database
connectMongoDB();

// Create app
const app = express();

// Middlewares 
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(morgan("common"))
app.use(helmet());
app.use(cors({ origin: process.env.FRONT_URL, credentials: true }));

/*const corsConfig = {
    origin: true,
    credentials: true,
  };
  
  app.use(cors(corsConfig));
  app.options('*', cors(corsConfig));*/

app.use(cookieParser())

// API ROUTES

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/url', require('./routes/url'));
app.use('/api/v1/user', require('./routes/user'));


// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;


const server = app.listen(PORT, () => console.log(`Server running on ${PORT}`))


process.on("unhandledRejection", ({err, promise}) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
})