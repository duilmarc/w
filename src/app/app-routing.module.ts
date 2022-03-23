import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiftsComponent } from './gifts/gifts.component';
import { LoginComponent } from './users/login/login.component';
import { SignupComponent } from './users/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'gifts',
    pathMatch: 'full',
  },
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "gifts",
    component: GiftsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
