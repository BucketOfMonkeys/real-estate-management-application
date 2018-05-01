const express = require('express');
const {json} = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const massive = require('massive');
const bCrypt = require('bcrypt');

// const axios = require('axios');

// Authentication Controllers
const {
  residentRegistration,
  ownerRegistration,
  residentLogin,
  ownerLogin,
  logout,
} = require(`${__dirname}/controllers/authenticationControllers`);

const {addProperties, getProperty, getProperties} = require(`${__dirname}/controllers/propertiesCtrl`);

const {addUnit, getUnitById} = require(`${__dirname}/controllers/unitsCtrl`);

const {getResidents} = require(`${__dirname}/controllers/residentsCtrl`)

const {workOrderByPropertyId} = require(`${__dirname}/controllers/workorderCtrl`)

require('dotenv').config();

const app = express();
const port = 3001;

massive(process.env.CONNECTION_STRING)
  .then((dbInstance) => {
    app.set('db', dbInstance);
  })
  .catch(err => console.log(err));

app.use(cors());
app.use(json());

app.set('bCrypt', bCrypt);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10000000,
  },
}));

app.post('/users/resident-registration', residentRegistration);
app.post('/users/resident-login', residentLogin);
app.post('/users/owner-registration', ownerRegistration);
app.post('/users/owner-login', ownerLogin);
app.post('/users/logout', logout);

app.post('/unit/add', addUnit);
app.get('/units/getById/:id', getUnitById);

app.post('/properties/add', addProperties);
app.get('/properties/getProperty/:id', getProperty);
app.get('/properties/getProperties', getProperties);

app.get('/residents/getById/:id', getResidents);

app.get('/workorder/getByPropertyId/:id', workOrderByPropertyId);

app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});
