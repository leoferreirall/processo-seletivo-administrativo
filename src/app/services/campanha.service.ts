import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampanhaService {

  private urlAPI = environment.urlApiCampanha;

  constructor(private _http: HttpClient) { }

  GetCurso(codColigada: any, codTipoCurso: any, codFilial: any, idPerLet: any, codPsPlano: any, qtdParcelasContrato: any, idCategoriaPs: any) {
    return this._http.get(this.urlAPI + `/api/v1/Campanha/GetCurso?codColigada=${codColigada}&codTipoCurso=${codTipoCurso}&codFilial=${codFilial}&idPerLet=${idPerLet}&codPsPlano=${codPsPlano}&qtdParcelasContrato=${qtdParcelasContrato}&idCategoriaPs=${idCategoriaPs}`).pipe((response: any) => response);
  }

  GetTurno(campanha: any) {
    return this._http.post(this.urlAPI + '/api/v1/Campanha/GetTurno', campanha).pipe((response: any) => response);
  }

  GetEstado(campanha: any) {
    return this._http.post(this.urlAPI + '/api/v1/Campanha/GetEstado', campanha).pipe((response: any) => response);
  }

  GetCidade(campanha: any) {
    return this._http.post(this.urlAPI + '/api/v1/Campanha/GetCidade', campanha).pipe((response: any) => response);
  }

  GetPolo(campanha: any) {
    return this._http.post(this.urlAPI + '/api/v1/Campanha/GetPolo', campanha).pipe((response: any) => response);
  }

  GetFormaIngresso(campanha: any) {
    return this._http.post(this.urlAPI + '/api/v1/Campanha/GetFormaIngresso', campanha).pipe((response: any) => response);
  }

  GetSemestre(campanha: any) {
    return this._http.post(this.urlAPI + '/api/v1/Campanha/GetSemestre', campanha).pipe((response: any) => response);
  }

  Salvar(campanha: any) {
    return this._http.post(this.urlAPI + '/api/v1/Campanha', campanha).pipe((response: any) => response);
  }
}