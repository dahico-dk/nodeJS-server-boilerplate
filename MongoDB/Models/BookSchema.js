const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  Author:{ type: String, required: true },
  PublishDate: {type: Date, required: true },
  Page:{type:Number},
  BookName:{ type: String, required: true }, 
});

module.exports=mongoose.model("BookSchema", BookSchema);

