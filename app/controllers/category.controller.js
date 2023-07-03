const db = require("../models");
const Category = db.categories;

// Create and Save a new Category
exports.create = (req, res) => {
  // Validate request
  if (!req.body.type) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Category
  const category = new Category({
    type: req.body.type,
  });

  // Save Category in the database
  category
    .save(category)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Category."
      });
    });
};

// Retrieve all Categorys from the database.
exports.findAll = (req, res) => {
  const type = req.query.type;
  var condition = type ? { type: { $regex: new RegExp(type), $options: "i" } } : {};

  Category.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categorys."
      });
    });
};

// Find a single Category with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Category.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Category with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Category with id=" + id });
    });
};

// Update a Category by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Category.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Category with id=${id}. Maybe Category was not found!`
        });
      } else res.send({ message: "Category was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Category with id=" + id
      });
    });
};

// Delete a Category with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Category.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
        });
      } else {
        res.send({
          message: "Category was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Category with id=" + id
      });
    });
};

// Delete all Categorys from the database.
exports.deleteAll = (req, res) => {
  Category.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Categorys were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all categorys."
      });
    });
};
