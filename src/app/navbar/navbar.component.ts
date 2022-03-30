import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { UserService } from "../users/user.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  @ViewChild("navbarToggler", { read: ElementRef }) navbarToggler!: ElementRef;
  @ViewChild("navbarCollapse") navbarCollapse!: ElementRef;
  socialUser?: SocialUser;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  constructor(
    private readonly router: Router,
    private readonly socialAuthService: SocialAuthService,
    private readonly userService: UserService
  ) {}

  navBarTogglerIsVisible() {
    return this.navbarCollapse.nativeElement.classList.contains("show");
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.navBarTogglerIsVisible()) {
          this.navbarToggler.nativeElement.click();
        }
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
