import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {
  question = {
    title: "",
    description: ""
  }
  constructor(private _service: MainService, private _router: Router) { }

  createQuestion() {
    this._service.createQuestion(this.question);
    this._router.navigate(['show_question'])
    this.question = {
      title: "",
      description: ""
    }
  }

  logout() {
    this._service.logout();
    this._router.navigate(['/']);
  }

  ngOnInit() {
  }

}
