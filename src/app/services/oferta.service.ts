import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  private urlAPI = environment.urlApiCampanha;

  constructor(private _http: HttpClient) { }

  GetTipoCurso(): Observable<any> {
    return this._http.get(this.urlAPI + '/api/v1/Oferta/GetTipoCurso').pipe((response: any) => response);
  }

  GetUnidade(codColigada: any, codTipoCurso: any) {
    return this._http.get(this.urlAPI + `/api/v1/Oferta/GetUnidade?codColigada=${codColigada}&codTipoCurso=${codTipoCurso}`).pipe((response: any) => response);
  }

  GetCategoria(codColigada: any, codTipoCurso: any, codFilial: any) {
    return this._http.get(this.urlAPI + `/api/v1/Oferta/GetCategoria?codColigada=${codColigada}&codTipoCurso=${codTipoCurso}&codFilial=${codFilial}`).pipe((response: any) => response);
  }

  GetPeriodoLetivo(codColigada: any, codTipoCurso: any, codFilial: any, idCategoriaPs: any) {
    return this._http.get(this.urlAPI + `/api/v1/Oferta/GetPeriodoLetivo?codColigada=${codColigada}&codTipoCurso=${codTipoCurso}&codFilial=${codFilial}&idCategoriaPs=${idCategoriaPs}`).pipe((response: any) => response);
  }

  GetFormaIngresso(codColigada: any, codTipoCurso: any, codFilial: any, idCategoriaPs: any, idPerLet: any) {
    return this._http.get(this.urlAPI + `/api/v1/Oferta/GetFormaIngresso?codColigada=${codColigada}&codTipoCurso=${codTipoCurso}&codFilial=${codFilial}&idCategoriaPs=${idCategoriaPs}&idPerLet=${idPerLet}`).pipe((response: any) => response);
  }

  Importar(oferta: any) {
    return this._http.post(this.urlAPI + '/api/v1/Oferta/Importar', oferta).pipe((response: any) => response);
  }
}