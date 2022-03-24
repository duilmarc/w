import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddGiftComponent } from "./gifts/add-gift/add-gift.component";
import { GiftsComponent } from "./gifts/gifts.component";
import { AdminGuard } from "./guards/admin.guard";
import { AuthGuard } from "./guards/auth.guard";
import { LoginComponent } from "./users/login/login.component";
import { SignupComponent } from "./users/signup/signup.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "gifts",
    pathMatch: "full",
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
    canActivateChild: [AuthGuard, AdminGuard],
    children: [
      {
        path: ":uuid/edit",
        component: AddGiftComponent,
      },
      {
        path: "add",
        component: AddGiftComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
