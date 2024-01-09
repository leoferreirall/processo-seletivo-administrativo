import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PsService {

  private urlAPI = environment.urlApiCampanha;

  constructor(private _http: HttpClient) { }

  GetFiltroTipoCurso(): Observable<any> {
    return this._http.get(this.urlAPI + `/api/v1/ProcessoSeletivo/GetFiltroTipoCurso`).pipe((response: any) => response);
  }
  GetFiltroUnidade(codTipoCurso: any): Observable<any> {
    return this._http.get(this.urlAPI + `/api/v1/ProcessoSeletivo/GetFiltroUnidade?codTipoCurso=${codTipoCurso}`).pipe((response: any) => response);
  }
  GetFiltroCategoriaPs(codFilial: any, codTipoCurso: any): Observable<any> {
    return this._http.get(this.urlAPI + `/api/v1/ProcessoSeletivo/GetFiltroCategoriaPs?codFilial=${codFilial}&codTipoCurso=${codTipoCurso}`).pipe((response: any) => response);
  }
  GetFiltroPeriodoLetivo(codFilial: any, codTipoCurso: any, idCategoriaPs: any) {
    return this._http.get(this.urlAPI + `/api/v1/ProcessoSeletivo/GetFiltroPeriodoLetivo?codTipoCurso=${codTipoCurso}&codFilial=${codFilial}&idCategoriaPs=${idCategoriaPs}`).pipe((response: any) => response);
  }  
  GetFiltroFormaIngresso(codTipoCurso: any, codFilial: any, idCategoriaPs: any, idPerLet: any): Observable<any> {
    return this._http.get(this.urlAPI + `/api/v1/ProcessoSeletivo/GetFiltroFormaIngresso?codTipoCurso=${codTipoCurso}&codFilial=${codFilial}&idCategoriaPs=${idCategoriaPs}&idPerLet=${idPerLet}`).pipe((response: any) => response);
  }
  GetFiltroTurno(codFilial: any, codTipoCurso: any, idPerLet: any, idCategoriaPs: any): Observable<any> {
    return this._http.get(this.urlAPI + `/api/v1/ProcessoSeletivo/GetFiltroTurno?codFilial=${codFilial}&codTipoCurso=${codTipoCurso}&idPerLet=${idPerLet}&idCategoriaPs=${idCategoriaPs}`).pipe((response: any) => response);
  }
  GetFiltroAreaInteresse(idPs: any, codTurno: any): Observable<any> {
    return this._http.get(this.urlAPI + `/api/v1/ProcessoSeletivo/GetFiltroAreaInteresse?idPs=${idPs}&codTurno=${codTurno}`).pipe((response: any) => response);
  }  

  GetFiltroAltTipoCurso(): Observable<any> {
    return this._http.get(this.urlAPI + `/api/v1/ProcessoSeletivo/GetFiltroAltTipoCurso`).pipe((response: any) => response);
  }
  GetFiltroAltUnidade(codTipoCurso: any): Observable<any> {
    return this._http.get(this.urlAPI + `/api/v1/ProcessoSeletivo/GetFiltroAltUnidade?codTipoCurso=${codTipoCurso}`).pipe((response: any) => response);
  }
  GetFiltroAltCategoriaPs(codFilial: any, codTipoCurso: any): Observable<any> {
    return this._http.get(this.urlAPI + `/api/v1/ProcessoSeletivo/GetFiltroAltCategoriaPs?codFilial=${codFilial}&codTipoCurso=${codTipoCurso}`).pipe((response: any) => response);
  }
  GetFiltroAltPeriodoLetivo(codFilial: any, codTipoCurso: any) {
    return this._http.get(this.urlAPI + `/api/v1/ProcessoSeletivo/GetFiltroAltPeriodoLetivo?codTipoCurso=${codTipoCurso}&codFilial=${codFilial}`).pipe((response: any) => response);
  }  
  GetFiltroAltFormaIngresso(idCategoriaPs: any): Observable<any> {
    return this._http.get(this.urlAPI + `/api/v1/ProcessoSeletivo/GetFiltroAltFormaIngresso?idCategoriaPs=${idCategoriaPs}`).pipe((response: any) => response);
  }
  GetFiltroAltTurno(codFilial: any, codTipoCurso: any, idPerLet: any, idCategoriaPs: any): Observable<any> {
    return this._http.get(this.urlAPI + `/api/v1/ProcessoSeletivo/GetFiltroAltTurno?codFilial=${codFilial}&codTipoCurso=${codTipoCurso}&idPerLet=${idPerLet}&idCategoriaPs=${idCategoriaPs}`).pipe((response: any) => response);
  }
  GetFiltroAltProcessoSeletivo(ps: any): Observable<any> {
    return this._http.post(this.urlAPI + `/api/v1/ProcessoSeletivo/GetFiltroAltProcessoSeletivo`, ps).pipe((response: any) => response);
  }

  GetFormaIngresso(codTipoCurso: any, idCategoriaPs: any, idPs: any, codPsFormaIngressoDominio: any): Observable<any> {
    return this._http.get(this.urlAPI + `/api/v1/ProcessoSeletivo/GetFormaIngresso?codTipoCurso=${codTipoCurso}&idCategoriaPs=${idCategoriaPs}&idPs=${idPs}&codPsFormaIngressoDominio=${codPsFormaIngressoDominio}`).pipe((response: any) => response);
  }

  GetReqFormaIngresso(codTipoCurso: any, idCategoriaPs: any, idPs: any, codPsFormaIngressoDominio: any): Observable<any> {
    return this._http.get(this.urlAPI + `/api/v1/ProcessoSeletivo/GetReqFormaIngresso?codTipoCurso=${codTipoCurso}&idCategoriaPs=${idCategoriaPs}&idPs=${idPs}&codPsFormaIngressoDominio=${codPsFormaIngressoDominio}`).pipe((response: any) => response);
  }

  ListarTipoRequisitos(): Observable<any> {
    return this._http.get(this.urlAPI + `/api/v1/ProcessoSeletivo/ListarTipoRequisitos`).pipe((response: any) => response);
  }

  Importar(ps: any) {
    return this._http.post(this.urlAPI + '/api/v1/ProcessoSeletivo/Importar', ps).pipe((response: any) => response);
  }
  Put(ps: any): Observable<any> {
    return this._http.put(this.urlAPI + `/api/v1/ProcessoSeletivo`, ps).pipe((response: any) => response);
  }

  CadastrarFormaingresso(request: any) {
    return this._http.post(this.urlAPI + '/api/v1/ProcessoSeletivo/CadastrarFormaingresso', request).pipe((response: any) => response);
  }
}