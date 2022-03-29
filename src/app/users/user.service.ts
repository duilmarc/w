import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Role } from "@prisma/client";
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { UserWithGifts } from "./user-with-gifts.model";
import { User } from "./user.model";

const helper = new JwtHelperService();
@Injectable({
  providedIn: "root",
})
export class UserService {
  headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
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

  async getUsers(): Promise<UserWithGifts[]> {
    if (!this.isAdmin()) {
      return [];
    }
    const users = await this.http.get<UserWithGifts[]>(
      environment.apiUrl + "/api/users",
      {
        headers: this.headers,
      }
    );
    const result = await lastValueFrom(users);
    console.log(result);
    return lastValueFrom(users);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }
}
