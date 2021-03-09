const path = require('path');
const express = require('express');
const dotenv = require('dotenv'); // module that loads environment variables from a .env file into process.env 
const morgan = require('morgan'); // // HTTP request logger middleware for node.js
const colors = require('colors'); // adds colors to text and symbols in the terminal
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const errorHandler = require('./middleware/error'); // custom error handler
const connectDB = require('./config/db');

// Load environment variables
// dotenv.config({ path: `${__dirname}/config/config.env` });
dotenv.config();

// Connect to database
connectDB();

// Route files
const auth = require('./routes/auth');
const getGyms = require('./routes/googlePlaces')
const home = require('./routes/home');
const users = require('./routes/users');
const workouts = require('./routes/workouts');
// const exercises = require('./routes/exercises');
const meals = require('./routes/meals');
const measurements = require('./routes/measurements');
// const muscles = require('./routes/muscles');
const sets = require('./routes/sets');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// HTTP request logger middleware for node.js
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, ' public')));

// Mount routers
app.use('/api/v1/auth', auth);
// app.use('/api/v1/exercises', exercises);
app.use('/api/v1/findgym', getGyms);
app.use('/api/v1/', home);
app.use('/api/v1/meals', meals);
app.use('/api/v1/measurements', measurements);
// app.use('/api/v1/muscles', muscles);
app.use('/api/v1/users', users);
app.use('/api/v1/workouts', workouts);
app.use('/api/v1/sets', sets);


app.use((req, res, next) => {
  res.status(404).send('<h1>Page not found!</h1>')
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
