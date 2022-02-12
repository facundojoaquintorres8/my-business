import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { checkPermission } from './check-permission';
import { ToastService } from '../toast/toast.service'

@Injectable()
export class AuthGuards implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private toastService: ToastService) { }

  canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot): boolean {
    if (!this.authService.getToken()) {
      this.router.navigate(['login'])
      return false;
    }

    const permissions = activatedRouteSnapshot.data['permissions'];

    if (permissions && !checkPermission(this.authService.getPermissions(), permissions)) {
      this.toastService.changeMessage(
        {
          isError: true,
          message: 'No tiene permisos.',
        }
      );
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }

}
