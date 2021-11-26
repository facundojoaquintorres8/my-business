import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class AuthGuards implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot):boolean {
    if(!this.authService.getToken()) {
      this.router.navigate(['login'])
      return false;
    }
    return true;
  }

}
