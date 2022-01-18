import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { NewsMainComponent } from './news-main/news-main.component';
import { NewsdetailsComponent } from './newsdetails/newsdetails.component';

const routes: Routes = [
  {
    path: "",
    component: NewsMainComponent
  },
  {
    path: "details/:id",
    component: NewsdetailsComponent
  },
  {
    canActivate: [AuthGuard],
    path: "admin",
    component: AdminComponent
  },
  {
    path: "login",
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
