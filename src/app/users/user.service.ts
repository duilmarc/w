import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { User } from "./user.model";

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

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }
}
