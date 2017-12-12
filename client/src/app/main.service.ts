import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class MainService {
  user;
  constructor(private _http: Http) {
    if (localStorage.user != undefined) {
      this.user = JSON.parse(localStorage.user);
    }
  }

  register(userdata, callback) {
    this._http.post("/register", userdata).subscribe(
      (res) => {
        console.log("from service register: ", res.json());
        callback(res.json());
        if(res.json().success == "success") {
          this.user = res.json().user;
          localStorage.user = JSON.stringify(res.json().user);
        }
      }, 
      (err) => {
        console.log("from service register error: ", err);
      }
      )
  }

  login(userdata, callback) {
    this._http.post("/login", userdata).subscribe(
      (res) => {
        callback(res.json());
        this.user = res.json();
        console.log(this.user);
        if(res.json().error == undefined) {
          this.user = res.json();
          console.log(this.user);
          localStorage.user = JSON.stringify(res.json());
        }
      }, 
      (err) => {
        console.log("error from login service: ", err);
      })
  }

  createQuestion(question) {
    this._http.post("/users/" + this.user._id + "/question", question).subscribe(
      (res) => {
        console.log("from create question service: ", res);
      }, 
      (err) => {
        console.log("from create question service: ", err);
      })
  }

  //retrieve all the questions
  retrieveAllQuestion(callback) {
    this._http.get("/questions").subscribe((res) => {
      callback(res.json());
      console.log("from service retrieveAllQuestion: ", res.json());
    })
  }

  //retrieve one question
  getOneQuestion(id, callback) {
    console.log("from service getOneQuestion: ", id);
    this._http.get("/question/" + id).subscribe((res) => {
      callback(res.json());
    })
  }

  //create answer
  createAnswer(answer, question_id, user_id) {
    this._http.post("/answer/" + question_id + "/" + user_id, answer).subscribe(
      (res) => {
        console.log("from service createanswer: ", res);
      },
      (err) => {
        console.log("error from service createanswer: ", err);
      })
  }

  //add like to answer
  like(id, callback) {
    console.log("from detail service like: ", id);
    this._http.post("/like/" + id, {}).subscribe(
      (res) => {
        console.log("from detail service like: ", res);
        callback(res.json());
      },
      (err) => {
        console.log("err from service create like: ", err.json());
      })
  }

  searchitem(search, callback) {
    this._http.post("/search", {search: search}).subscribe(
      (res) => {
        console.log("from service search: ", res);
        callback(res.json());
      }, 
      (err) => {
        console.log("from service searchitem error: ", err);
      })
  }

  destroy(id, callback) {
    this._http.delete("/question/" + id).subscribe(
      (res) => {
        callback(res.json());
      }, 
      (err) => {
        console.log("error from service destroy: ", err);
      })
  }

  logout() {
    localStorage.removeItem("user");
  }



}














