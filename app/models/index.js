const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose);
db.categories = require("./category.model.js")(mongoose);
db.feacher = require("./feacher.model.js")(mongoose);
db.project = require("./project.model.js")(mongoose);

module.exports = db;
