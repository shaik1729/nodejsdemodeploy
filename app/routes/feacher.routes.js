module.exports = app => {
  const feachers = require("../controllers/feacher.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", feachers.create);

  // Retrieve all Tutorials
  router.get("/", feachers.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", feachers.findOne);

  // Update a Tutorial with id
  router.put("/:id", feachers.update);

  // Delete a Tutorial with id
  router.delete("/:id", feachers.delete);

  // Create a new Tutorial
  router.delete("/", feachers.deleteAll);

  app.use("/api/feachers", router);
};
