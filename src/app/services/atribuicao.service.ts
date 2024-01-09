import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtribuicaoService {

  private urlAPI = environment.urlApiCampanha;

  constructor(private _http: HttpClient) { }

  ListarPlanosPrivados(codPsTipoPlano: any) {
    return this._http.get(this.urlAPI + `/api/v1/Plano?codPsTipoPlano=${codPsTipoPlano}`).pipe((response: any) => response);
  }

  GetFormaIngresso(codPsPlano: any): Observable<any> {
    return this._http.get(this.urlAPI + `/api/v1/Atribuicao/GetFormaIngresso?codPsPlano=${codPsPlano}`).pipe((response: any) => response);
  }

  GetCurso(codPsPlano: any) {
    return this._http.get(this.urlAPI + `/api/v1/Atribuicao/GetCurso?codPsPlano=${codPsPlano}`).pipe((response: any) => response);
  }

  GetAtribuicao(atrib: any): Observable<any> {
    return this._http.post(this.urlAPI + `/api/v1/Atribuicao/GetAtribuicao`, atrib).pipe((response: any) => response);
  }

  Post(atrib: any): Observable<any> {
    return this._http.post(this.urlAPI + `/api/v1/Atribuicao`, atrib).pipe((response: any) => response);
  }

  Remove(atrib: any): Observable<any> {
    return this._http.post(this.urlAPI + `/api/v1/Atribuicao/Remove`, atrib).pipe((response: any) => response);
  }
}