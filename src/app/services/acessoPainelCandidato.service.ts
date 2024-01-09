import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { environment } from 'src/environments/environment';
import { AcessoToscana } from '../Models/AcessoToscana';

@Injectable({
  providedIn: 'root'
})
export class AcessoPainelCandidatoService {
  private urlLogin = environment.urlApiUsuarios;

  constructor(private http: HttpClient) {
  }
  RegistrarAcessoToscana(request: AcessoToscana) {
    return this.http.post(this.urlLogin + '/api/v1/AcessoToscana/RegistrarAcesso', request).pipe((response: any) => response);
  }
}
