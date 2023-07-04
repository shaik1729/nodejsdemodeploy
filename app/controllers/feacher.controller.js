const db = require("../models");
const Feacher = db.feacher;

// Create and Save a new Feacher
exports.create = (req, res) => {
  // Validate request

  // console.log(req.body);

  if (!req.body.title || !req.body.img || !req.body.about || !req.body.category) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Feacher
  const feacher = new Feacher({
    title: req.body.title,
    about: req.body.about,
    category: req.body.category,
    img: req.body.img
  });
  // console.log(feacher);

  // Save Feacher in the database
  feacher
    .save(feacher)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Feacher."
      });
    });
};

// Retrieve all Feachers from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Feacher.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving feachers."
      });
    });
};

// Find a single Feacher with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Feacher.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Feacher with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Feacher with id=" + id });
    });
};

// Update a Feacher by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Feacher.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Feacher with id=${id}. Maybe Feacher was not found!`
        });
      } else res.send({ message: "Feacher was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Feacher with id=" + id
      });
    });
};

// Delete a Feacher with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Feacher.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Feacher with id=${id}. Maybe Feacher was not found!`
        });
      } else {
        res.send({
          message: "Feacher was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Feacher with id=" + id
      });
    });
};

// Delete all Feachers from the database.
exports.deleteAll = (req, res) => {
  Feacher.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Feachers were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all feachers."
      });
    });
};
