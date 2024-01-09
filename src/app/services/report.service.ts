import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ReportService {

  private urlAPIBackOffice = environment.urlApiBackOffice;

  constructor(private _http: HttpClient) { }

  Listar(param: any){
    return this._http.post(this.urlAPIBackOffice + `/api/v1/Report/GetFiltroTipoCurso`, param).pipe((response: any) => response);
  }

  Post(report: any) {
    return this._http.post(this.urlAPIBackOffice + `/api/v1/Report/GetReport`, report).pipe((response: any) => response);
  }

  GetTrilha(codPsUsuario: any) {
    return this._http.get(this.urlAPIBackOffice + `/api/v1/Trilha?codPsUsuario=${codPsUsuario}`).pipe((response: any) => response);
  }

  DetalhamentoAuditHistorico(codPsAuditHistorico: any) {    
    return this._http.get(this.urlAPIBackOffice + `/api/v1/Trilha/DetalhamentoAuditHistorico?codPsAuditHistorico=${codPsAuditHistorico}`).pipe((response: any) => response);    
  }


  GetTipoCurso() {
    return this._http.get(this.urlAPIBackOffice + '/api/v1/ReportGeral/GetTipoCurso').pipe((response: any) => response);
  }

  GetUnidade(codColigada: any, codTipoCurso: any) {
    return this._http.get(this.urlAPIBackOffice + `/api/v1/ReportGeral/GetUnidade?codColigada=${codColigada}&codTipoCurso=${codTipoCurso}`).pipe((response: any) => response);
  }

  GetCategoria(codColigada: any, codTipoCurso: any, codFilial: any) {
    return this._http.get(this.urlAPIBackOffice + `/api/v1/ReportGeral/GetCategoria?codColigada=${codColigada}&codTipoCurso=${codTipoCurso}&codFilial=${codFilial}`).pipe((response: any) => response);
  }

  GetPeriodoLetivo(codColigada: any, codTipoCurso: any, codFilial: any, idCategoriaPs?: any) {
    if(idCategoriaPs){
      return this._http.get(this.urlAPIBackOffice + `/api/v1/ReportGeral/GetPeriodoLetivo?codColigada=${codColigada}&codTipoCurso=${codTipoCurso}&codFilial=${codFilial}&idCategoriaPs=${idCategoriaPs}`).pipe((response: any) => response);
    }else{
      return this._http.get(this.urlAPIBackOffice + `/api/v1/ReportGeral/GetPeriodoLetivo?codColigada=${codColigada}&codTipoCurso=${codTipoCurso}&codFilial=${codFilial}`).pipe((response: any) => response);
    }    
  }

  GetCurso(codColigada: any, codTipoCurso: any, codFilial: any, idCategoriaPs: any, idPerLet: any) {
    return this._http.get(this.urlAPIBackOffice + `/api/v1/ReportGeral/GetCurso?codColigada=${codColigada}&codTipoCurso=${codTipoCurso}&codFilial=${codFilial}&idPerLet=${idPerLet}&idCategoriaPs=${idCategoriaPs}`).pipe((response: any) => response);
  }

  GetTurno(report: any) {
    return this._http.post(this.urlAPIBackOffice + '/api/v1/ReportGeral/GetTurno', report).pipe((response: any) => response);
  }

  GetFormaIngresso(report: any) {
    return this._http.post(this.urlAPIBackOffice + '/api/v1/ReportGeral/GetFormaIngresso', report).pipe((response: any) => response);
  }

  Exportar(report: any) {
    return this._http.post(this.urlAPIBackOffice + '/api/v1/ReportGeral/Exportar', report, { responseType: 'blob', observe: 'response' });
  }
}
