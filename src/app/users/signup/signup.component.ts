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
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  user?: User;
  confirmPassword: string = "";
  passwordMatch = true;
  errorMessage = "";
  faFacebook = faFacebookF;
  faGoogle = faGoogle;
  socialButtonsEnabled: boolean = false;
  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.socialAuthService.initState.subscribe((state) => {
      this.socialButtonsEnabled = state;
    });
    if (this.userService.isLoggedIn()) {
      this.router.navigate(["/gifts"]);
    }
  }

  async signUp(form: NgForm) {
    const values = form.value;
    if (form.invalid) {
      return;
    }
    const user = {
      ...values,
    } as User;
    if (this.confirmPassword !== user.password) {
      this.passwordMatch = false;
      return;
    }
    this.passwordMatch = true;
    try {
      await this.userService.signUp(user);
      this.router.navigate(["/gifts"]);
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        this.errorMessage = e.error.message;
      }
      return;
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
