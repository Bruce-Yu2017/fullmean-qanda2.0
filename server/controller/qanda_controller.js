var mongoose = require("mongoose");
var path = require("path");
var User = mongoose.model("User");
var Question = mongoose.model("Question");
var Answer = mongoose.model("Answer");


module.exports = {
  register: function(req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
      if(err) {
        console.log("register err from controller: ", err);
      }
      else {
        if(user == null) {
          var user = new User(req.body);
          user.save(function(err, user) {
            if(err) {
              console.log("err from register controller after save: ", err);
              res.json(err)
            }
            else {
              res.json({success: "success", user: user});
            }
          })
        }
        else {
          res.json("from register controller res: email existed")
        }
      }
    })
  },

  login: function(req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
      if(err) {
        console.log("error from login controller: ", err);
      }
      else {
        if(user == null) {
          res.json({error: "email invalid"})
        }
        else {
          if(user.password == req.body.password) {
            res.json(user)
          }
          else {
            res.json({error: "password is not correct"})
          }
        }
      }
    })
  },

  createQuestion: function(req, res) {
    User.findOne({_id: req.params.id}, function(err, user) {
      if(err) {
        console.log("error from controller createQuestion: ", err);
      }
      else {
        var question = new Question(req.body);
        question._user = user._id;
        question.save(function(err) {
          if(err) {
            console.log("error from controller createQuestion after question save: ", err);
          }
          else {
            user._questions.push(question);
            user.save(function(err) {
              if(err) {
                console.log("error from controller createQuestion after user save: ", err);
              }
              else {
                console.log("create question success");
              }
            })
          }
          
        })
      }
    })
  },

  retrieveQuestion: function(req, res) {
    Question.find({}).sort({createdAt: "desc"}).populate("_user").populate("_answers").exec(function(err, question) {
      if(err) {
        console.log("error from controller retrieveQuestion: ", err);
      }
      else {
        res.json(question);
      }
    })
  },

  getOneQuestion: function(req, res) {
    Question.findOne({_id: req.params.id}).populate({path: "_answers", populate: {path: "_user"}}).exec(function(err, question) {
      // console.log("from controller getOneQuestion: ", question);
      if(err) {
        console.log("from controller getOneQuestion err: ", err);
      }
      else {
        // console.log("from controller getOneQuestion question: ", question);
        res.json(question);
      }
    })
  },

  createAnswer: function(req, res) {
    var qId = req.params.question_id;
    var uId = req.params.user_id;
    var answer = new Answer(req.body);
    answer.likes = 0;
    //add answers into question
    Question.findOne({_id: qId}, function(err, ques) {
      // console.log("from controller createAnswer find ques: ", ques);
      answer._question = ques._id;
      answer.save(function(err) {
        if(err) {
          console.log("from controller createAnswer first save: ", err);
        }
        else {
          ques._answers.push(answer);
          // console.log("from controller createAnswer second find ques: ", ques);
          ques.save(function(err) {
            if(err) {
              console.log("from controller createAnswer after ques save: ", err);
            }
            else {
              console.log("create answer success");
            }
          })
        }
      })
    })
    //add answers into user
    User.findOne({_id: uId}, function(err, user) {
      console.log(user);
      answer._user = user._id;
      answer.save(function(err) {
        if(err) {
          console.log("from controller createAnswer second save: ", err);
        }
        else {
          user.save(function(err) {
            user._answers.push(answer);
            user.save(function(err) {
              if(err) {
                console.log("from controller createAnswer after user save: ", err);
              }
              else {
                console.log("answer save in user success");
              }
            })
          })
        }
      })
    })
  },

  //create answer like
  addlike: function(req, res) {
    Answer.findOne({_id: req.params.id}, function(err, answer) {
      console.log("from controller like: ", answer);
      if(err) {
        console.log("err from controller like: ", err);
      }
      else {
        // console.log("from controller like: ", answer);
        answer.likes += 1;
        answer.save(function(err) {
          if(err) {
            console.log("err from controller like after save: ", err);
          }
          else {
            console.log("create like success");
          }
        })
      }
    })
  },

  //search
  search: function(req, res) {
    Question.find({title: {$regex: req.body.search}}).sort({updatedAt: "desc"}).exec(function(err, question) {
      if(err) {
        console.log("from controller search error: ", err);
      }
      else {
        res.json(question);
      }
    })
  },

  delete: function(req, res) {
    Question.remove({_id: req.params.id}, function(err) {
      if(err) {
        console.log("err from controller delete: ", err);
      }
      else {
        console.log("success delete");
      }
    })
  }
}









