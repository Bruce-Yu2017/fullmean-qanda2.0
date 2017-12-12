var qanda = require('../controller/qanda_controller.js');
var path = require('path');

module.exports = function(app){
  //user register
  app.post("/register", function(req, res) {
    qanda.register(req, res);
  })

  //user login
  app.post("/login", function(req, res) {
    qanda.login(req, res);
  })

  //create questions
  app.post("/users/:id/question", function(req, res) {
    qanda.createQuestion(req, res);
  })

  //retrieve all questions
  app.get("/questions", function(req, res) {
    qanda.retrieveQuestion(req, res);
  })

  //retrieve one questions
  app.get("/question/:id", function(req, res) {
    qanda.getOneQuestion(req, res);
  })

  //create answer
  app.post("/answer/:question_id/:user_id", function(req, res) {
    qanda.createAnswer(req, res);
  })

  //create answer like
  app.post("/like/:id", function(req, res) {
    qanda.addlike(req, res);
  })

  //search item
  app.post("/search", function(req, res) {
    qanda.search(req, res);
  })

  //delete question
  app.delete("/question/:id", function(req, res) {
    qanda.delete(req, res);
  })










    
  
    app.all("*",function(req,res){
      res.sendFile('index.html', { root: './client/dist' });
    })
  
  
  
  
  }
