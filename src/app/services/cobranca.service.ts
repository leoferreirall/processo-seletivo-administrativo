import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CobrancaService {

  private urlAPI = environment.urlApiCobranca;
  private urlAPIBO = environment.urlApiBackOffice;

  constructor(private _http: HttpClient) { }

  ListarBoletosByStatus(status: any) {
    return this._http.get(this.urlAPI + `/api/v1/Boleto/ListarBoletosByStatus?status=${status}`).pipe((response: any) => response);
  }

  GetBaixaManual(baixa: any) {
    return this._http.post(this.urlAPIBO + `/api/v1/BaixaManual/GetBaixaManual`, baixa).pipe((response: any) => response);
  }

  RealizarPagamentoManualCartao(cartao: any) {
    return this._http.post(this.urlAPIBO + `/api/v1/BaixaManual/RealizarPagamentoManualCartao`, cartao).pipe((response: any) => response);
  }

  RealizarPagamentoManualBoleto(boleto: any) {
    return this._http.post(this.urlAPIBO + `/api/v1/BaixaManual/RealizarPagamentoManualBoleto`, boleto).pipe((response: any) => response);
  }

  /*RealizarPagamentoManualBoleto(boleto: any) {
    return this._http.post(this.urlAPI + `/api/v1/Crefisa/RealizarPagamentoManualBoleto`, boleto).pipe((response: any) => response);
  }*/
}
