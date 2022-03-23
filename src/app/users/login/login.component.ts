import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
} from "angularx-social-login";
import { User } from "../user.model";
import { UserService } from "../user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  user?: User;
  errorMessage = "";
  faFacebook = faFacebookF;
  faGoogle = faGoogle;
  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly socialAuthService: SocialAuthService
  ) {}

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      // console.log('something here');
      this.router.navigate(["/gifts"]);
    }
  }

  async onSubmit(form: NgForm) {
    const values = form.value;
    const user = { email: values.email, password: values.password } as User;
    try {
      await this.userService.logIn(user);
      this.router.navigate(["/gifts"]);
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        this.errorMessage = e.error.message;
      }
    }
  }
  async loginWithGoogle(): Promise<void> {
    const socialUser = await this.socialAuthService.signIn(
      GoogleLoginProvider.PROVIDER_ID
    );
    const user: User = {
      email: socialUser.email,
      name: socialUser.name,
    };
    if (user) {
      const result = await this.userService.socialLogin(user);
      if (result) {
        this.router.navigate(["/gifts"]);
      }
    }
  }

  async loginWithFacebook(): Promise<void> {
    const socialUser = await this.socialAuthService.signIn(
      FacebookLoginProvider.PROVIDER_ID
    );
    const user: User = {
      email: socialUser.email,
      name: socialUser.name,
    };
    if (user) {
      const result = await this.userService.socialLogin(user);
      if (result) {
        this.router.navigate(["/gifts"]);
      }
    }
  }
}
