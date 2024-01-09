import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { decode } from 'punycode';
import { Roles } from 'src/app/Helpers/Roles';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlAPI = environment.urlApiLogin;
  private roles = new Roles;

  constructor(private _http: HttpClient, private router: Router) {
  }

  loginService(user): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = new HttpParams()
      .set('username', user.username)
      .set('password', user.password);

    return this._http.post<any>(this.urlAPI + '/api/v1/Login/LoginAD', body, { headers: headers });
  }

  getUser() {
    return localStorage.getObject('user');
  }

  getToken() {
    return this.getUser()?.token;
  }

  validateRole(role: string) {
    var token = this.getToken();

    if (token) {
      const decoded: any = jwt_decode(token);

      if (decoded.role.find((x: string) => x == role)) {
        return true
      } else if (this.roles.roleGeral.find(x => x.toLowerCase() == decoded.Username.toLowerCase())) {
        return true;
      }
    }

    return false;
  }

  validateRoleAvaliacao(role: string) {
    var token = this.getToken();

    if (token) {
      const decoded: any = jwt_decode(token);

      if (decoded.role.find((x: string) => x == role)) {
        return true
      } else if (this.roles.roleAvaliacao.find(x => x.toLowerCase() == decoded.Username.toLowerCase())) {
        return true;
      }
    }

    return false;
  }

  validateRoleSecretaria(role: string) {
    var token = this.getToken();

    if (token) {
      const decoded: any = jwt_decode(token);

      if (decoded.role.find((x: string) => x == role)) {
        return true
      } else if (this.roles.roleSecretaria.find(x => x.toLowerCase() == decoded.Username.toLowerCase())) {
        return true;
      }
    }

    return false;
  }

  validateRoleGestaoSecretaria(role: string) {
    var token = this.getToken();

    if (token) {
      const decoded: any = jwt_decode(token);

      if (decoded.role.find((x: string) => x == role)) {
        return true
      } else if (this.roles.roleGestaoSecretaria.find(x => x.toLowerCase() == decoded.Username.toLowerCase())) {
        return true;
      }
    }

    return false;
  }

  validateRoleAuditoria(role: string) {
    var token = this.getToken();

    if (token) {
      const decoded: any = jwt_decode(token);

      if (decoded.role.find((x: string) => x == role)) {
        return true
      } else if (this.roles.roleAuditoria.find(x => x.toLowerCase() == decoded.Username.toLowerCase())) {
        return true;
      }
    }

    return false;
  }

  validateRoleAnalise(role: string) {
    var token = this.getToken();

    if (token) {
      const decoded: any = jwt_decode(token);

      if (decoded.role.find((x: string) => x == role)) {
        return true
      } else if (this.roles.roleAnalise.find(x => x.toLowerCase() == decoded.Username.toLowerCase())) {
        return true;
      }
    }

    return false;
  }

  validateRoleFinanceiro(role: string) {
    var token = this.getToken();

    if (token) {
      const decoded: any = jwt_decode(token);

      if (decoded.role.find((x: string) => x == role)) {
        return true
      } else if (this.roles.roleFinanceiro.find(x => x.toLowerCase() == decoded.Username.toLowerCase())) {
        return true;
      }
    }

    return false;
  }

  //ACESSO APENAS PARA A VISUALIZAÇÃO DO ALUNO
  validateRoleAcessoUsuario(role: string) {
    var token = this.getToken();
    if (token) {
      const decoded: any = jwt_decode(token);

      if (decoded.role.find((x: string) => x == role)) {
        return true
      }
      else if (this.roles.roleAcessoUsuario.find(x => x.toLowerCase() == decoded.Username.toLowerCase())) {
        return true;
      }
    }
    return false;
  }

  validateRoleAtendimento(role: string) {
    var token = this.getToken();

    if (token) {
      const decoded: any = jwt_decode(token);

      if (decoded.role.find((x: string) => x == role)) {
        return true
      } else if (this.roles.roleAtendimento.find(x => x.toLowerCase() == decoded.Username.toLowerCase())) {
        return true;
      }
    }

    return false;
  }

  validateRoleAcademico(role: string) {
    var token = this.getToken();

    if (token) {
      const decoded: any = jwt_decode(token);

      if (decoded.role.find((x: string) => x == role)) {
        return true
      } else if (this.roles.roleAcademico.find(x => x.toLowerCase() == decoded.Username.toLowerCase())) { // Analise de documento
        return true;
      }
    }

    return false;
  }

  validateRoleProva(role: string) {
    var token = this.getToken();

    if (token) {
      const decoded: any = jwt_decode(token);

      if (decoded.role.find((x: string) => x == role)) {
        return true
      } else if (this.roles.roleProva.find(x => x.toLowerCase() == decoded.Username.toLowerCase())) {
        return true;
      }
    }

    return false;
  }

  getTokenExpirationDate(token: string): Date {
    token = this.getToken()
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  loggedIn() {
    return this.getToken();
  }

  logout() {
    localStorage.removeItem('user');

    this.router.navigate(['/acesso-ao-painel']);
  }

}
