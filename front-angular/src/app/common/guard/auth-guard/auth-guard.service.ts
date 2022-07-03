import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { CommonService } from "../../services/common.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private commonService: CommonService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // | Promise<boolean | UrlTree> // | Observable<boolean | UrlTree> // | UrlTree // | boolean
    const token: string = this.commonService.getAccessToken();

    if (!token) {
      this.router.navigate(["/auth/login"]);
      return false;
    }

    return true;
  }
}
