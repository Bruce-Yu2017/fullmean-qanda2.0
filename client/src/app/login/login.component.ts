import { MainService } from './../main.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user_login = {
    email: "",
    password: ""
  }

  user_reg = {
    name: "",
    email: "",
    password: ""
  }

  password_confirm = {
    con: ""
  }

  error_message = {
    email: "",
    login: ""
  }

  constructor(private _service: MainService, private _router: Router) { }

  register() {
    console.log("from com register: ", this.user_reg);
    this._service.register(this.user_reg,
      (res) => {
        if (res.success === "success") {
          this._router.navigate(['/show_question'])
        }
        else {
          this.error_message.email = "This email has been registered.";
        }
        this.user_reg = {
          name: "",
          email: "",
          password: ""
        };
        this.password_confirm = {
          con: ""
        };
      })
  }

  login() {
    this._service.login(this.user_login, 
      (res) => {
        if(res.error == undefined) {
          this._router.navigate(['/show_question']);
        }
        else {
          this.error_message.login = res.error;
        }
      });
    this.user_login = {
      email: "",
      password: ""
    };
  }

  ngOnInit() {
    // JS for login and register form
    $(function () {
      $('#login-form-link').click(function (e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
      });
      $('#register-form-link').click(function (e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
      });
    });

  }

}
