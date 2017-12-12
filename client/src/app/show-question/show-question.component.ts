import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-question',
  templateUrl: './show-question.component.html',
  styleUrls: ['./show-question.component.css']
})
export class ShowQuestionComponent implements OnInit {
  user = {
    name: ""
  }
  questions;
  search;
  constructor(private _service: MainService, private _router: Router) { }

  ngOnInit() {
    if(localStorage.user == undefined) {
      this._router.navigate(['/'])
    }
    this.user = this._service.user;
    this._service.retrieveAllQuestion((res) => {
      // console.log("from show question com: ", res);
      this.questions = res;
      console.log("from show question com: ", this.questions);
    })

  }

  logout() {
    this._service.logout();
    this._router.navigate(['/']);
  }

  searchitem() {
    if(this.search == null) {
      this._service.retrieveAllQuestion(
        (res) => {
      // console.log("from show question com: ", res);
      this.questions = res;
      console.log("from show question com: ", this.questions);
      })
    }
    else {
      this._service.searchitem(this.search, (res) => {
        this.questions = res;
      })
    }
  }

  destroy(id) {
    this._service.destroy(id, (res) => {
      console.log("from show question destroy: ", res);
    })
    this._service.retrieveAllQuestion((res) => {
      // console.log("from show question com: ", res);
      this.questions = res;
      // console.log("from show question com: ", this.questions);
    })
  }

}
