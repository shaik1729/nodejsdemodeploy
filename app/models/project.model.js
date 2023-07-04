const { Schema } = require("mongoose");

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
     tag: String,
     name: String,
     price_per_square: String,
     sqft: String,
     starting_price: String,
     status: String,
     configuration: String,
     category: String,
     location: String,
     main_image: String,
     site_layout: String,
     about: String,
     short_description: String,
     specifications: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Project = mongoose.model("Project", schema);
  return Project;
};
