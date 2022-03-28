import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Role } from "@prisma/client";
const helper = new JwtHelperService();

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(private readonly router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.removeItem("token");
      this.router.navigate(["/login"]);
      return false;
    }
    const decodedToken = helper.decodeToken(token);
    if (helper.isTokenExpired(token)) {
      localStorage.removeItem("token");
      this.router.navigate(["/login"]);
      return false;
    }
    if (decodedToken.role === Role.ADMIN) {
      return true;
    }
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
    return false;
  }
}
