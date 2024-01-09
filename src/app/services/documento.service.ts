import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  private urlAPI = environment.urlApiBackOffice;

  constructor(private _http: HttpClient) { }

  GetHtmlDocumentoVigente(codPsTipoDoc: any) {
    return this._http.get(this.urlAPI + `/api/v1/ProcessoSeletivo/GetHtmlDocumentoVigente?codPsTipoDoc=${codPsTipoDoc}`).pipe((response: any) => response);
  }

  CriarNovoDocumento(request: any) {
    return this._http.post(this.urlAPI + '/api/v1/ProcessoSeletivo/CriarNovoDocumento', request).pipe((response: any) => response);
  }
}