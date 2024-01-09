import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { AuthService } from '@services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivateChild {

  constructor(
    private auth: AuthService,
    private router: Router) {

  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      var url = state.url;

    if (this.auth.validateRole('')) {
      return true;
    }
    else if (this.auth.validateRoleAvaliacao('')) {
      return true;
    }
    else if (this.auth.validateRoleSecretaria('')) {
      return true;
    }
    else if (this.auth.validateRoleAuditoria('')) {
      return true;
    }
    else if (this.auth.validateRoleAnalise('')) {
      return true;
    }
    else if (this.auth.validateRoleFinanceiro('')) {
      return true;
    }
    else if (this.auth.validateRoleAtendimento('')) {
      return true;
    }
    else if (this.auth.validateRoleAcademico('')) {
      return true;
    }
    else if (this.auth.validateRoleProva('')) {
      return true;
    }
    else {
      return this.router['/acesso-ao-painel'];
    }
  }


}
