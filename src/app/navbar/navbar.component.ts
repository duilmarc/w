import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { UserService } from "../users/user.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  socialUser?: SocialUser;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  constructor(
    private readonly router: Router,
    private readonly socialAuthService: SocialAuthService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = this.userService.isLoggedIn();
        this.isAdmin = this.userService.isAdmin();
      }
    });
  }

  async logout() {
    localStorage.removeItem("token");
    try {
      await this.socialAuthService.signOut();
    } catch (e) {
      console.log(e);
    }
    this.router.navigate(["/login"]);
  }
}
