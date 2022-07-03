import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { CommonService } from '../../services/common.service';
import {Location} from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class OtherGuardService implements CanActivate {
  constructor(
    private router: Router, 
    private _location: Location,
    private commonService: CommonService) {}

    canActivate(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // | Promise<boolean |  UrlTree> // | import("rxjs").Observable<boolean | UrlTree> // | import("@angular/router").UrlTree // | boolean
    const isInstructor: string = childRoute.data.isInstructor;
    const token: string = this.commonService.getAccessToken();
    const userDetail = this.commonService.getUserDetails();

    if (token && userDetail) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
