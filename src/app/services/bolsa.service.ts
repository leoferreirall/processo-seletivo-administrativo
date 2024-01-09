import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BolsaService {

  private urlAPI = environment.urlApiCampanha;

  constructor(private _http: HttpClient) { }

  GetTipoCurso() {
    return this._http.get(this.urlAPI + '/api/v1/Bolsa/GetTipoCurso').pipe((response: any) => response);
  }

  GetUnidade(codColigada: any, codTipoCurso: any) {
    return this._http.get(this.urlAPI + `/api/v1/Bolsa/GetUnidade?codColigada=${codColigada}&codTipoCurso=${codTipoCurso}`).pipe((response: any) => response);
  }

  GetPeriodoLetivo(codColigada: any, codTipoCurso: any, codFilial: any) {
    return this._http.get(this.urlAPI + `/api/v1/Bolsa/GetPeriodoLetivo?codColigada=${codColigada}&codTipoCurso=${codTipoCurso}&codFilial=${codFilial}`).pipe((response: any) => response);
  }

  GetBolsa(codColigada: any, codTipoCurso: any, idPerLet: any) {
    return this._http.get(this.urlAPI + `/api/v1/Bolsa/GetBolsa?codColigada=${codColigada}&codTipoCurso=${codTipoCurso}&idPerLet=${idPerLet}`).pipe((response: any) => response);
  }

  GetTipoBolsa() {
    return this._http.get(this.urlAPI + '/api/v1/Bolsa/GetTipoBolsa').pipe((response: any) => response);
  }

  GetTipoDesconto() {
    return this._http.get(this.urlAPI + '/api/v1/Bolsa/GetTipoDesc').pipe((response: any) => response);
  }

  GetFormaIngresso(codColigada: any, codTipoCurso: any, idPerLet: any) {
    return this._http.get(this.urlAPI + `/api/v1/Bolsa/GetFormaIngresso?codColigada=${codColigada}&codTipoCurso=${codTipoCurso}&idPerLet=${idPerLet}`).pipe((response: any) => response);
  }

  Importar(Importacao: any) {
    return this._http.post(this.urlAPI + '/api/v1/Bolsa/Importar', Importacao).pipe((response: any) => response);
  }
}