const mongoose = require("mongoose");
const schema = mongoose.Schema;
const objectId =  mongoose.ObjectId;

const userSchema = mongoose.Schema({
  name: String,
  email: {
    type:String,
    required : true,
  },
  password: String
})

const todoSchema = mongoose.Schema({
  description : String,
  done:Boolean,
  userId : objectId,
})

const UserModel = mongoose.model("user",userSchema);
const todoModel = mongoose.model("todo",todoSchema);

module.exports = { UserModel, todoModel };
