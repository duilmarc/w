import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  user?: User;
  confirmPassword: string = '';
  passwordMatch = true;
  errorMessage = '';
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/gifts']);
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
      this.router.navigate(['/gifts']);
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        this.errorMessage = e.error.message;
      }
      return;
    }
  }
}
