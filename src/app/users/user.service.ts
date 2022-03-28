import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Role } from "@prisma/client";
import { environment } from "src/environments/environment";
import { User } from "./user.model";

const helper = new JwtHelperService();
@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  async signUp(user: User): Promise<boolean> {
    const token = await this.http
      .post<{ token: string }>(environment.apiUrl + "/api/users/signup", user)
      .toPromise();
    if (!token) {
      return false;
    }
    localStorage.setItem("token", token.token);
    return true;
  }

  async logIn(user: User): Promise<boolean> {
    const token = await this.http
      .post<{ token: string }>(environment.apiUrl + "/api/users/login", user)
      .toPromise();
    if (!token) {
      return false;
    }
    localStorage.setItem("token", token.token);
    return true;
  }

  async socialLogin(user: User): Promise<boolean> {
    const token = await this.http
      .post<{ token: string }>(
        environment.apiUrl + "/api/users/social-login",
        user
      )
      .toPromise();
    if (!token) {
      return false;
    }
    localStorage.setItem("token", token.token);
    return true;
  }

  isAdmin(): boolean {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }

    const decodedToken = helper.decodeToken(token);
    return decodedToken.role === Role.ADMIN;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }
}
