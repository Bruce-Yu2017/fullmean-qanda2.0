import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {
  question = {
    title: "",
    support: "",
    _id: ""
  }
  user;
  constructor(private _service: MainService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.user = this._service.user;
    this._route.paramMap.subscribe(params => {
      this._service.getOneQuestion(params.get("id"), (res) => {
        console.log("from detail oninit: ", res);
        this.question = res;
        // this.question._id = res._id;
      })
    })
  }

  like(id) {
    console.log("from detail com like: ", id);
    this._service.like(id, (res) => {
      this.question = res;
    })
    this._route.paramMap.subscribe(params => {
      this._service.getOneQuestion(params.get("id"), (res) => {
        this.question = res;
      })
    })
  }

  logout() {
    this._service.logout();
    this._router.navigate(['/']);
  }

}
