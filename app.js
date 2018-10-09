const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
mongoose.Promise = global.Promise;
// Connect To Database
mongoose.connect(config.database);
const db=mongoose.connection
db.on('open',()=>{
    console.log('connected to database'+config.database);
})
db.on('error',(err)=>{
  console.log('database error'+err);
})

const app = express();

const users = require('./routes/users');
const admin = require('./routes/admin');


// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/admin',admin);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});
