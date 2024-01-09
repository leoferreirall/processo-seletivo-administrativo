import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProcessoseletivoServiceService {
  private urlAPI = environment.urlApiProcessoSeletivo;

  constructor(private _http: HttpClient) {}

  public getPolos() {
    return this._http
      .get(this.urlAPI + "/api/v1/Plano/GetTipoCurso")
      .pipe((response: any) => response);
  }

  public getModalidades() {
    return this._http
      .get(this.urlAPI + "/api/v1/ProcessosSeletivos/GetPsUnidade", {
        params: {
          codperlet: "",
          categoriaps: "",
          formaingresso: "",
          ignorafiminscricao: "0",
        },
      })
      .pipe((response: any) => response);
  }
  public GetPeriodoLetivo() {
    return this._http
      .get(this.urlAPI + "/api/v1/Plano/GetPeriodoLetivo",{
        params: {
          codColigada:"",
          codTipoCurso: "",
          codFilial: "",
          idCategoriaPs:"",
        },
      })
     .pipe((response: any) => response);
  }

  public GetTurno() {
    return this._http
      .get(this.urlAPI + "/api/v1/Convenio/GetTurno",{
        params: {
          codColigada:"",
          codTipoCurso: "",
          codFilial: "",
          idCategoriaPs:"",
        },
      })
     .pipe((response: any) => response);
}

public GetCurso() {
  return this._http
    .get(this.urlAPI + "/api/v1/Convenio/GetCurso?codColigada=",{
      params: {
        codColigada:"",
        codTipoCurso: "",
        codFilial: "",
        idCategoriaPs:"",
      },
    })
   .pipe((response: any) => response);

}

public GetSemestre() {
  return this._http
    .get(this.urlAPI + "/api/v1/Convenio/GetCurso?codColigada=",{
      params: {
        codColigada:"",
        codTipoCurso: "",
        codFilial: "",
        idCategoriaPs:"",
      },
    })
   .pipe((response: any) => response);

  }

  public GetBolsa() {
    return this._http
      .get(this.urlAPI + "/api/v1/Convenio/GetBolsa?codColigada",{
        params: {
          codColigada:"",
          codTipoCurso: "",
          codFilial: "",
          idCategoriaPs:"",
        },
      })
     .pipe((response: any) => response);

    }

    public GetCategoria() {
      return this._http
        .get(this.urlAPI + "/api/v1/Convenio/GetBolsa?codColigada",{
          params: {
            codColigada:"",
            codTipoCurso: "",
            codFilial: "",
            idCategoriaPs:"",
          },
        })
       .pipe((response: any) => response);

  }}
