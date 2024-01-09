import { Component, OnInit,ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { Select } from "src/app/Models/Select";
import {HttpClient,HttpErrorResponse,HttpHeaders,HttpParams,} from "@angular/common/http";
import { environment } from "src/environments/environment";
import { CarregarSelect } from 'src/app/Helpers/CarregarSelect';
import { ProcessoseletivoServiceService } from "@services/processoseletivoService.service";
import { ToastrService } from "ngx-toastr";
import { ConvenioService } from "@services/convenio.service";
import { NgxSpinner } from "ngx-spinner/lib/ngx-spinner.enum";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-consulta-de-planos",
  templateUrl: "./consulta-de-planos.html",
  styleUrls: ["./consulta-de-planos.scss"],
})
export class ConsultadePlanosComponent implements OnInit {
  private urlApiProcessoSeletivo = environment.urlApiProcessoSeletivo;

  periodoLetivoSelecionado: any;
  modalidadeSelecionado: any;

  public listaPeriodoLetivos : any[];
  public listaAreaInteresse: any [];
  public listaCampus: any [];
  public listaCursos: any[];
  public listaTurnos : any[];
  public listaModalidade : any [];
  public listaPeriodosLetivos: any[];
  public listaCampanha: any[];

  constructor(
     private processoSeletivoService: ProcessoseletivoServiceService,
     private toastr: ToastrService,
     private convenioService: ConvenioService,
     private ngxSpinner: NgxSpinnerService) {}

  ngOnInit() {
    this.populaModalidades();
  }

  public populaModalidades(){
    this.processoSeletivoService.getModalidades().
    subscribe(
      (resp:Response)=>{
      this.listaModalidade =  resp.result;
  },
  (error:Error)=>{this.toastr.error("ERRO AO CHAMAR A API")});
}

public populaPeriodoLetivo(event: any){
  this.ngxSpinner.show();

  this.modalidadeSelecionado = this.listaModalidade.find((i, e) => {
    return i == event.target.value;
  })

  this.convenioService.GetPeriodoLetivo(1,
    this.modalidadeSelecionado.codTipoCurso,
    this.modalidadeSelecionado.codFilial,
    this.modalidadeSelecionado.idCategoriaPs).subscribe(
    (resp: Response) => {
      this.listaPeriodoLetivos = resp.result;
      console.log(resp.result)
    },
    (error: Error)=>{
      this.toastr.error("ERRO AO TENTAR PEGAR OS PERÍODO LETIVOS");
    },
    ()=>{
      this.ngxSpinner.hide();
    }
  )
}

public populaTurnoLetivo(event: any){
  this.ngxSpinner.show();

  this.periodoLetivoSelecionado = this.listaPeriodoLetivos.find((i, e) => {
    return i == event.target.value;
  })
  var convenio = {
    codColigada: 1,
    codTipoCurso: this.modalidadeSelecionado.codTipoCurso,
    idPerLet: this.periodoLetivoSelecionado.idPerLet,
    codFilial: this.modalidadeSelecionado.codFilial,
    codPsPlano: this.periodoLetivoSelecionado.codPsPlano,
    idCategoriaPs: this.modalidadeSelecionado.idCategoriaPs
  }

  this.convenioService.GetTurno(convenio).subscribe(
    (resp: Response) => {
      this.listaTurnos = resp.result;
      console.log(this.listaTurnos)
    },
    (error: Error)=>{
      this.toastr.error("ERRO AO TENTAR PEGAR OS PERÍODO LETIVOS");
    },
    ()=>{
      this.ngxSpinner.hide();
    }
  )
}

public populaSemestre(){
  this.processoSeletivoService.GetSemestre().
  subscribe(
    (resp:Response)=>{
    this.listaTurnos =  resp.result;
    console.log(this.listaTurnos)
},
(error:Error)=>{this.toastr.error("ERRO AO CHAMAR A API")});
}
public populaCampanha(){
  this.processoSeletivoService.GetBolsa().
  subscribe(
    (resp:Response)=>{
    this.listaTurnos =  resp.result;
    console.log(this.listaTurnos)
},
(error:Error)=>{this.toastr.error("ERRO AO CHAMAR A API")});

}
public populaFormaIngresso(){
  this.processoSeletivoService.GetCategoria().
  subscribe(
    (resp:Response)=>{
    this.listaTurnos =  resp.result;
    console.log(this.listaTurnos)
},
(error:Error)=>{this.toastr.error("ERRO AO CHAMAR A API")});


}
  public filtroTabela(e: any, id: number){
  }
}

interface Response {
  statusCode: number;
  result: any;
  message: string;
}



