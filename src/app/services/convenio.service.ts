import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConvenioService {

  private urlAPI = environment.urlApiCampanha;

  constructor(private _http: HttpClient) { }

  GetTipoCurso() {
    return this._http.get(this.urlAPI + '/api/v1/Convenio/GetTipoCurso').pipe((response: any) => response);
  }

  GetUnidade(codColigada: any, codTipoCurso: any) {
    return this._http.get(this.urlAPI + `/api/v1/Convenio/GetUnidade?codColigada=${codColigada}&codTipoCurso=${codTipoCurso}`).pipe((response: any) => response);
  }

  GetCategoria(codColigada: any, codTipoCurso: any, codFilial: any) {
    return this._http.get(this.urlAPI + `/api/v1/Convenio/GetCategoria?codColigada=${codColigada}&codTipoCurso=${codTipoCurso}&codFilial=${codFilial}`).pipe((response: any) => response);
  }

  GetPeriodoLetivo(codColigada: any, codTipoCurso: any, codFilial: any, idCategoriaPs?: any) {
    if(idCategoriaPs){
      return this._http.get(this.urlAPI + `/api/v1/Convenio/GetPeriodoLetivo?codColigada=${codColigada}&codTipoCurso=${codTipoCurso}&codFilial=${codFilial}&idCategoriaPs=${idCategoriaPs}`).pipe((response: any) => response);
    }else{
      return this._http.get(this.urlAPI + `/api/v1/Convenio/GetPeriodoLetivo?codColigada=${codColigada}&codTipoCurso=${codTipoCurso}&codFilial=${codFilial}`).pipe((response: any) => response);
    }
    
  }

  GetCurso(codColigada: any, codTipoCurso: any, codFilial: any, idCategoriaPs: any, idPerLet: any) {
    return this._http.get(this.urlAPI + `/api/v1/Convenio/GetCurso?codColigada=${codColigada}&codTipoCurso=${codTipoCurso}&codFilial=${codFilial}&idPerLet=${idPerLet}&idCategoriaPs=${idCategoriaPs}`).pipe((response: any) => response);
  }

  GetBolsa(codColigada: any, codTipoCurso: any, idCategoriaPs: any, idPerLet: any) {
    return this._http.get(this.urlAPI + `/api/v1/Convenio/GetBolsa?codColigada=${codColigada}&codTipoCurso=${codTipoCurso}&idPerLet=${idPerLet}&idCategoriaPs=${idCategoriaPs}`).pipe((response: any) => response);
  }

  GetTurno(convenio: any) {
    return this._http.post(this.urlAPI + '/api/v1/Convenio/GetTurno', convenio).pipe((response: any) => response);
  }

  GetEstado(convenio: any) {
    return this._http.post(this.urlAPI + '/api/v1/Convenio/GetEstado', convenio).pipe((response: any) => response);
  }

  GetCidade(convenio: any) {
    return this._http.post(this.urlAPI + '/api/v1/Convenio/GetCidade', convenio).pipe((response: any) => response);
  }

  GetPolo(convenio: any) {
    return this._http.post(this.urlAPI + '/api/v1/Convenio/GetPolo', convenio).pipe((response: any) => response);
  }

  GetFormaIngresso(convenio: any) {
    return this._http.post(this.urlAPI + '/api/v1/Convenio/GetFormaIngresso', convenio).pipe((response: any) => response);
  }

  GetSemestre(convenio: any) {
    return this._http.post(this.urlAPI + '/api/v1/Convenio/GetSemestre', convenio).pipe((response: any) => response);
  }

  Exportar(convenio: any) {
    return this._http.post(this.urlAPI + '/api/v1/Convenio/Exportar', convenio, { responseType: 'blob', observe: 'response' });
  }

  Publicar(){
    return this._http.post(this.urlAPI + '/api/v1/Convenio/Publicar', null);
  }

  ExisteConvenioPlanilhaPendente(){
    return this._http.get(this.urlAPI + "/api/v1/Convenio/GetExistePlanilhaPendente").pipe((response: any) => response);
  }

  ExisteConvenioTemp(){
    return this._http.get(this.urlAPI + "/api/v1/Convenio/GetExisteConvenioTemp").pipe((response: any) => response);
  }

  Importar(fileToUpload: File) {
    const formData: FormData = new FormData();
    
    formData.append('file', fileToUpload, fileToUpload.name);

    const headers = new HttpHeaders();

    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this._http.post(this.urlAPI + '/api/v1/Convenio/Importar', formData, { headers: headers });
  }
}