import { MainService } from './main.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { HttpModule } from '@angular/http'; // <-- Import HttpModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ShowQuestionComponent } from './show-question/show-question.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { CreateAnswerComponent } from './create-answer/create-answer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ShowQuestionComponent,
    CreateQuestionComponent,
    QuestionDetailComponent,
    CreateAnswerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // <-- Include module in our AppModules
		HttpModule,
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
