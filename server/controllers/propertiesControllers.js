const addProperties = (req, res) => {
  const db = req.app.get('db');
  const {
    name, photourl, address, units, value, expenses,
  } = req.body;

  db
    .addProperties([name, photourl, address, units, value, expenses, req.session.user.userid])
    .then(response => res.status(200).json(response))
    .catch(err => console.log(err));
};

const getProperty = (req, res) => {
  const db = req.app.get('db');

  const property = {};

  db
    .getPropertyById([req.params.id])
    .then((propertyResponse) => {
      property.property = propertyResponse[0];
      db
        .properties_occupiedUnits([req.params.id])
        .then((unitsResponse) => {
          const sorted = unitsResponse.sort((a, b) => a.roomnum - b.roomnum);
          property.property.occupiedUnits = sorted;
          property.property.income = unitsResponse.reduce(
            (accumulator, currentValue) => accumulator + currentValue.rent,
            0,
          );
          return res.status(200).json(property);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

const getProperties = (req, res) => {
  const db = req.app.get('db');

  db
    .properties_getProperties([req.session.user.userid])
    .then(response => res.status(200).json(response))
    .catch(err => console.log(err));
};

const deleteProperty = (req, res) => {
  const db = req.app.get('db');

  db
    .properties_deleteProperty([req.params.id])
    .then(response => res.status(200).json({deleted: true, propertyid: req.params.id}))
    .catch(err => res.status(200).json({deleted: false, err}));
};

module.exports = {
  addProperties,
  getProperty,
  getProperties,
  deleteProperty,
};
