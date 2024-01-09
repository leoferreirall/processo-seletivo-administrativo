import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {

  private urlAPI = environment.urlApiBackOffice;
  private urlLogin = environment.urlApiLogin;

  constructor(private _http: HttpClient) { }

  GetInfoCandidato(filtro: any) {
    return this._http.post(this.urlAPI + '/api/v1/Atendimento/GetInfoCandidato', filtro).pipe((response: any) => response);
  }
  IniciarAtendimento(atendimento: any) {
    return this._http.post(this.urlAPI + '/api/v1/Atendimento/Iniciar', atendimento).pipe((response: any) => response);
  }
  CancelarAtendimento(atendimento: any) {
    return this._http.post(this.urlAPI + '/api/v1/Atendimento/Cancelar', atendimento).pipe((response: any) => response);
  }
  FinalizarAtendimento(atendimento: any) {
    return this._http.post(this.urlAPI + '/api/v1/Atendimento/Finalizar', atendimento).pipe((response: any) => response);
  }
  AlterarCadastro(atendimento: any) {
    return this._http.post(this.urlAPI + '/api/v1/Atendimento/AlterarCadastro', atendimento).pipe((response: any) => response);
  }
  ReenviarSenha(atendimento: any) {
    return this._http.post(this.urlAPI + '/api/v1/Atendimento/ReenviarSenha', atendimento).pipe((response: any) => response);
  }
  EnviarSenhaPadrao(atendimento: any) {
    return this._http.post(this.urlAPI + '/api/v1/Atendimento/EnviarSenhaPadrao', atendimento).pipe((response: any) => response);
  }

  DesbloquearAcesso(atendimento: any) {
    return this._http.post(this.urlAPI + '/api/v1/Atendimento/DesbloquearAcesso', atendimento).pipe((response: any) => response);
  }

  AcessarPainelCandidato(cpf: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let cpfsemformaracao = cpf.replace('.', '').replace('.', '').replace('-', '');

    let body = `grant_type=password&cpf=${cpfsemformaracao}`;

    return this._http.post<any>(`${this.urlLogin}/v1/Login/Login`, body, { headers });
  }
}
