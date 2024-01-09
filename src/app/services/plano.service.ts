import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PlanoService {

  private urlAPI = environment.urlApiCampanha;

  constructor(private _http: HttpClient) { }

  GetTipoCurso() {
    return this._http.get(this.urlAPI + '/api/v1/Plano/GetTipoCurso').pipe((response: any) => response);
  }

  GetUnidade(codColigada: any, codTipoCurso: any) {
    return this._http.get(this.urlAPI + `/api/v1/Plano/GetUnidade?codColigada=${codColigada}&codTipoCurso=${codTipoCurso}`).pipe((response: any) => response);
  }

  GetPeriodoLetivo(codColigada: any, codTipoCurso: any, codFilial: any, idCategoriaPs: any) {
    return this._http.get(this.urlAPI + `/api/v1/Plano/GetPeriodoLetivo?codColigada=${codColigada}&codTipoCurso=${codTipoCurso}&codFilial=${codFilial}&idCategoriaPs=${idCategoriaPs}`).pipe((response: any) => response);
  }

  GetTipoServico(codColigada: any, codTipoCurso: any, idPerLet: any) {
    return this._http.get(this.urlAPI + `/api/v1/Plano/GetTipoServico?codColigada=${codColigada}&codTipoCurso=${codTipoCurso}&idPerLet=${idPerLet}`).pipe((response: any) => response);
  }

  GetBolsa(codColigada: any, codTipoCurso: any, idPerLet: any) {
    return this._http.get(this.urlAPI + `/api/v1/Plano/GetBolsa?codColigada=${codColigada}&codTipoCurso=${codTipoCurso}&idPerLet=${idPerLet}`).pipe((response: any) => response);
  }

  GetConvenio(codColigada: any) {
    return this._http.get(this.urlAPI + `/api/v1/Plano/GetConvenio?codColigada=${codColigada}`).pipe((response: any) => response);
  }

  CadasrarPlano(plano: any) {
    return this._http.post(this.urlAPI + '/api/v1/Plano', plano).pipe((response: any) => response);
  }

  AtualizarPlano(plano: any){
    return this._http.put(this.urlAPI + `/api/v1/Plano/${plano.codPsPlano}`, plano).pipe((response: any) => response);
  }

  ListarPlanos() {
    return this._http.get(this.urlAPI + '/api/v1/Plano').pipe((response: any) => response);
  }  

  GetPlanoById(id: any) {
    return this._http.get(this.urlAPI + `/api/v1/Plano/GetById?codPsPlano=${id}`).pipe((response: any) => response);
  }
}