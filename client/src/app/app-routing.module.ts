import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ShowQuestionComponent } from './show-question/show-question.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { CreateAnswerComponent } from './create-answer/create-answer.component';
import { MainService } from './main.service';



const routes: Routes = [
{path: "", pathMatch: "full", component: LoginComponent},
{path: "show_question", pathMatch: "full", component: ShowQuestionComponent},
{path: "create_question", pathMatch: "full", component: CreateQuestionComponent},
{path: "questions/:id", pathMatch: "full", component: QuestionDetailComponent},
{path: "questions/:id/answer", pathMatch: "full", component: CreateAnswerComponent},
{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
