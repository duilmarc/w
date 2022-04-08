import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddGiftComponent } from "./gifts/add-gift/add-gift.component";
import { GiftsComponent } from "./gifts/gifts.component";
import { InstructionsComponent } from "./gifts/instructions/instructions.component";
import { MyGiftsComponent } from "./gifts/my-gifts/my-gifts.component";
import { AdminGuard } from "./guards/admin.guard";
import { AuthGuard } from "./guards/auth.guard";
import { ListComponent } from "./users/list/list.component";
import { LoginComponent } from "./users/login/login.component";
import { SignupComponent } from "./users/signup/signup.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "instructions",
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
    // children: [
    //   {
    //     path: ":uuid/edit",
    //     component: AddGiftComponent,
    //     canActivate: [AdminGuard],
    //   },
    //   {
    //     path: "add",
    //     component: AddGiftComponent,
    //     canActivate: [AdminGuard],
    //   },
    // ],
  },
  {
    path: "gifts/:uuid/edit",
    component: AddGiftComponent,
    canActivate: [AdminGuard],
  },
  {
    path: "gifts/add",
    component: AddGiftComponent,
    canActivate: [AdminGuard],
  },
  {
    path: "gifts/my",
    component: MyGiftsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "users",
    component: ListComponent,
    canActivate: [AdminGuard],
  },
  {
    path:'instructions',
    component: InstructionsComponent
  },
  {
    path: "**",
    redirectTo: "gifts",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
