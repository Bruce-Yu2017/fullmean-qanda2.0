var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true},
  _questions: [{type: Schema.Types.ObjectId, ref:"Question"}],
  _answers: [{type: Schema.Types.ObjectId, ref: "Answer"}]
}, {timestamps: true});

var User = mongoose.model("User", UserSchema);

var QuestionSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String},
  _user: {type: Schema.Types.ObjectId, ref:"User"},
  _answers: [{type: Schema.Types.ObjectId, ref: "Answer"}]
}, {timestamps: true})

var Question = mongoose.model("Question", QuestionSchema)

var AnswerSchema = new mongoose.Schema({
  _question: {type: Schema.Types.ObjectId, ref: "Question"},
  _user: {type: Schema.Types.ObjectId, ref: "User"},
  title: {type: String, required: true},
  support: {type: String},
  likes: Number
}, {timestamps: true});

var Answer = mongoose.model("Answer", AnswerSchema);










