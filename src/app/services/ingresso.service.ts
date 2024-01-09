import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { StatusReq } from '../Models/StatusReq';
import { take } from 'rxjs-compat/operator/take';
import { first } from 'rxjs/operators';
import { param } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class IngressoService {
  private urlAPI = environment.urlApiIngresso;

  constructor(private _http: HttpClient) { }

  GetInscricaoById(codPsInscricao: any): Observable<any> {
    return this._http.get(this.urlAPI + `/api/v1/Inscricao/${codPsInscricao}`).pipe((response: any) => response);
  }

  GetProvaById(codPsProva: any): Observable<any> {
    return this._http.get(this.urlAPI + `/api/v1/avaliacao/${codPsProva}`).pipe((response: any) => response);
  }

  GetEnemById(codPsIngressoEnem: any): Observable<any> {
    return this._http.get(this.urlAPI + `/api/v1/Enem/${codPsIngressoEnem}`).pipe((response: any) => response);
  }

  GetAnaliseCurricularById(codPsReqAnalise: any): Observable<any> {
    return this._http.get(this.urlAPI + `/api/v1/Analise/${codPsReqAnalise}`).pipe((response: any) => response);
  }

  ListarEnemByStatus(statusAprovacao: any): Observable<any> {
    return this._http.get(this.urlAPI + `/api/v1/Enem/ListarByStatus?statusAprovacao=${statusAprovacao}`).pipe((response: any) => response);
  }

  ListarPendentesAvaliacaoProva(): Observable<any> {
    return this._http.get(this.urlAPI + '/api/v1/avaliacao/pendentescorrecao').pipe((response: any) => response);
  }

  ListarAvaliacoes(paramsDataTable: any): Observable<any> {
    return this._http.post(this.urlAPI + '/api/v1/avaliacao/todasAvaliacoes', paramsDataTable).pipe((response: any) => response);
  }
  // ListarAvaliacoes(): Observable<any> {
  //   return this._http.get(this.urlAPI + '/api/v1/avaliacao/todasAvaliacoes').pipe((response: any) => response);
  // }

  ListarSituacoesPorAvaliacoes(): Observable<StatusReq[]> {
    return this._http.get<StatusReq[]>(this.urlAPI + '/api/v1/status/PegarStatusPorAvaliacao').pipe(first());
  }

  ListarPendentesAvaliacaoDiplomado(): Observable<any> {
    return this._http.get(this.urlAPI + '/api/v1/Diplomado/ListarPendentesAvaliacao').pipe((response: any) => response);
  }

  ListarAnaliseByStatus(statusAprovacao: any, codPsTipoRequisito: any): Observable<any> {
    return this._http.get(this.urlAPI + `/api/v1/Analise/ListarByStatus?statusAprovacao=${statusAprovacao}&codPsTipoRequisito=${codPsTipoRequisito}`).pipe((response: any) => response);
  }

  ListarArquivosByRef(codPsRefArquivos: any): Observable<any> {
    return this._http.get(this.urlAPI + `/api/v1/Arquivos/ListarArquivos/${codPsRefArquivos}`).pipe((response: any) => response);
  }

  CorrecaoProva(prova: any): Observable<any> {
    return this._http.post(this.urlAPI + '/api/v1/avaliacao/correcao', prova).pipe((response: any) => response);
  }

  EnviarNota(enem: any): Observable<any> {
    return this._http.post(this.urlAPI + '/api/v1/Enem/EnviarNota', enem).pipe((response: any) => response);
  }

  AprovarReprovarEnem(enem: any): Observable<any> {
    return this._http.put(this.urlAPI + `/api/v1/Enem/AprovarReprovar/${enem.codPsIngressoEnem}`, enem).pipe((response: any) => response);
  }

  AtualizarAnalise(analiseCurricular: any): Observable<any> {
    return this._http.put(this.urlAPI + `/api/v1/Analise/${analiseCurricular.codPsReqAnalise}`, analiseCurricular).pipe((response: any) => response);
  }

  CriarHabilitacaoAnalise(codPsReqAnalise: any, habilitacao: any, files: File[]): Observable<any> {
    const formData: FormData = new FormData();

    for (const file of files) {
      formData.append('files', file, file.name);
    }

    formData.append('codPsInscricao', habilitacao.codPsInscricao);
    formData.append('codPsRequisitos', habilitacao.codPsRequisitos);
    formData.append('idHabilitacaoFilial', habilitacao.idHabilitacaoFilial);
    formData.append('codPeriodo', habilitacao.codPeriodo);
    formData.append('instituicao', habilitacao.instituicao);

    if (habilitacao.nota != null) {
      formData.append('nota', habilitacao.nota);
    }

    const headers = new HttpHeaders();

    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this._http.post(this.urlAPI + `/api/v1/Analise/CriarHabilitacao/${codPsReqAnalise}`, formData, { headers: headers }).pipe((response: any) => response);
  }

  EnviarArquivosAnalise(codPsReqAnalise: any, files: File[]) {
    const formData: FormData = new FormData();

    for (const file of files) {
      formData.append('files', file, file.name);
    }

    const headers = new HttpHeaders();

    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this._http.put(this.urlAPI + `/api/v1/Analise/EnvioArquivosCoordenacao/${codPsReqAnalise}`, formData, { headers: headers }).pipe((response: any) => response);
  }

  ListarMatrizByInscricao(codPsInscricao: any): Observable<any> {
    return this._http.get(this.urlAPI + `/api/v1/Habilitacao/ListarMatrizByInscricao/${codPsInscricao}`).pipe((response: any) => response);
  }

  ListarInstituicoes(): Observable<any> {
    return this._http.get(this.urlAPI + '/api/v1/Habilitacao/ListarInstituicoes').pipe((response: any) => response);
  }

  ListarPeriodoIngressoByInscricao(codPsInscricao: any, codGrade: any): Observable<any> {
    return this._http.get(this.urlAPI + `/api/v1/Habilitacao/ListarPeriodoIngressoByInscricao/${codPsInscricao}?codGrade=${codGrade}`).pipe((response: any) => response);
  }

  ListarStatusPromocao(codPsInscricao: any, codPsStatusReq: any, codPsTipoRequisito: any): Observable<any> {
    return this._http.get(this.urlAPI + `/api/v1/Status/ListarStatusPromocao/${codPsInscricao}/${codPsStatusReq}/${codPsTipoRequisito}`).pipe((response: any) => response);
  }

  ListarStatus(): Observable<any> {
    return this._http.get(this.urlAPI + `/api/v1/Status/ListarStatusPromocao`).pipe((response: any) => response);
  }

  InserirDisciplinaCanvas(model: any): Observable<any> {
    return this._http.post(this.urlAPI + `/api/v1/Avaliacao/InserirDisciplinaCanvas`, model).pipe((response: any) => response);
  }

  ListarCorrecoesCanvas(): Observable<any> {
    return this._http.get(this.urlAPI + '/api/v1/Avaliacao/ListarCorrecoesCanvas').pipe((response: any) => response);
  }

  FinalizarCorrecaoCanvasById(codPsConfigMod: any): Observable<any> {
    return this._http.put(this.urlAPI + `/api/v1/Avaliacao/FinalizarCorrecaoCanvasById/${codPsConfigMod}`, null).pipe((response: any) => response);
  }
}
