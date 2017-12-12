import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-answer',
  templateUrl: './create-answer.component.html',
  styleUrls: ['./create-answer.component.css']
})
export class CreateAnswerComponent implements OnInit {
  question = {
    title: "",
    support: "",
    _id: ""
  }
  user;
  answer = {
    title: "",
    support: ""
  }

  constructor(private _service: MainService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.user = this._service.user;
    this._route.paramMap.subscribe(params => {
      this._service.getOneQuestion(params.get("id"), (res) => {
        this.question = res;
      })
    })
  }

  createAnswer() {
    this._service.createAnswer(this.answer, this.question._id, this.user._id);
    this._router.navigate(['/show_question']);
    this.answer = {
      title: "",
      support: ""
    }
  }

}













