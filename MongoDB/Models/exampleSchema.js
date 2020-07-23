const mongoose = require("mongoose");

const exampleSchema = mongoose.Schema({
  exampleString: { type: String, required: true },
  exampleDate: { type: Date, required: true },
});

module.exports=mongoose.model("exampleSchema", postSchema);

