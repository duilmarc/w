import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/users/user.service";

@Component({
  selector: "app-instructions",
  templateUrl: "./instructions.component.html",
  styleUrls: ["./instructions.component.scss"],
})
export class InstructionsComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
  }
}
