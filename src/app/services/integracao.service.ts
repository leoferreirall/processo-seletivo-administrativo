import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntegracaoService {
  private urlAPI = environment.urlApiIntegracao;

  constructor(private _http: HttpClient) { }
  
  getListaFluxos():Observable<any>{
    return this._http.get(this.urlAPI + '/api/v1/Integracao/ListarFluxos').pipe((response: any) => response);
  }
  
  getListaInscricao():Observable<any>{
    return this._http.get(this.urlAPI + '/api/v1/Integracao/ListarInscricoes').pipe((response: any) => response);
  }

  getInscricaoById(id: any):Observable<any>{
    return this._http.get(this.urlAPI + `/api/v1/Integracao/GetInscricaoById/${id}`).pipe((response: any) => response);
  }

  getListaAtividadesInscricao(id: any):Observable<any>{
    return this._http.get(this.urlAPI + `/api/v1/Integracao/ListarAtividadesInscricao/${id}`).pipe((response: any) => response);
  }

  GetQtdIncricaoByAtividade():Observable<any>{
    return this._http.get(this.urlAPI + '/api/v1/Dashboard/GetQtdIncricaoByAtividade').pipe((response: any) => response);
  }

  GetQtdStatusByAtividade():Observable<any>{
    return this._http.get(this.urlAPI + '/api/v1/Dashboard/GetQtdStatusByAtividade').pipe((response: any) => response);
  }

  ReprocessarInscricao(id: any):Observable<any>{
    return this._http.put(this.urlAPI + `/api/v1/Integracao/ReprocessarInscricao/${id}`, null).pipe((response: any) => response);
  }
}