import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import * as jwt from "jsonwebtoken";
import { Role } from "@prisma/client";

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
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   this.router.navigate(["/login"]);
    //   return false;
    // }
    // try {
    //   const decoded: { uuid: string; role: string } = jwt.verify(
    //     token,
    //     "secret"
    //   ) as { uuid: string; role: string };
    //   if (decoded.role === Role.ADMIN) {
    //     return true;
    //   }
    // } catch (e) {
    //   this.router.navigate(["/login"]);
    //   return false;
    // }
    return false;
  }
}
