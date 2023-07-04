const db = require("../models");
const Project = db.project;

// Create and Save a new Project
exports.create = (req, res) => {
  // Validate request

  // console.log(req.body);

  if (
    !req.body.tag || 
    !req.body.name || 
    !req.body.price_per_square || 
    !req.body.sqft || 
    !req.body.starting_price || 
    !req.body.status || 
    !req.body.category || 
    !req.body.location ||
    !req.body.main_image ||
    !req.body.site_layout
    ) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Project
  const project = new Project({
    tag: req.body.tag,
    name: req.body.name,
    price_per_square: req.body.price_per_square,
    sqft: req.body.sqft,
    starting_price: req.body.starting_price,
    status: req.body.status,
    category: req.body.category,
    location: req.body.location,
    configuration: req.body.configuration || "",
    main_image: new Buffer(req.body.main_image),
    site_layout: new Buffer(req.body.site_layout)
  });
  // console.log(project);

  // Save Project in the database
  project
    .save(project)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project."
      });
    });
};

// Retrieve all Projects from the database.
exports.findAll = (req, res) => {
  const category = req.query.category;
  var condition = category ? { category: { $regex: new RegExp(category), $options: "i" } } : {};

  Project.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving projects."
      });
    });
};

// Find a single Project with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Project.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Project with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Project with id=" + id });
    });
};

// Update a Project by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Project.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Project with id=${id}. Maybe Project was not found!`
        });
      } else res.send({ message: "Project was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Project with id=" + id
      });
    });
};

// Delete a Project with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Project.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Project with id=${id}. Maybe Project was not found!`
        });
      } else {
        res.send({
          message: "Project was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Project with id=" + id
      });
    });
};

// Delete all Projects from the database.
exports.deleteAll = (req, res) => {
  Project.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Projects were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all projects."
      });
    });
};
