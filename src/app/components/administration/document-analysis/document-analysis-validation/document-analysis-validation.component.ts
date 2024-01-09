import { Component, OnInit, ViewChild } from '@angular/core';
import { IngressoService } from '@services/ingresso.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { StatusAprovacao } from 'src/app/Models/status-aprovacao.enum';

declare var $: any;

@Component({
  selector: 'app-document-analysis-validation',
  templateUrl: './document-analysis-validation.component.html',
  styleUrls: ['./document-analysis-validation.component.scss']
})
export class DocumentAnalysisValidationComponent implements OnInit {
  @ViewChild('formAnaliseDocumento') formAnaliseDocumento: NgForm;

  id: any;
  analiseDocumento: any = {};
  inscricao: any = {};
  files: File[] = [];
  liberarCampos = true;

  statusAprovacao: any;
  statusAprovacaoEnum = StatusAprovacao;

  listaStatusAprovacao: any[] = [];

  constructor(
    private Router: Router,
    private IngressoService: IngressoService,
    private toastr: ToastrService,
    private NgxSpinnerService: NgxSpinnerService,
    private ActivatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.ActivatedRoute.snapshot.paramMap.get("id");

    this.NgxSpinnerService.show();

    this.IngressoService.GetAnaliseCurricularById(this.id).subscribe((response: any) => {
      if (response.statusCode == 200 && response.result != null) {
        this.analiseDocumento = response.result;

        this.IngressoService.GetInscricaoById(this.analiseDocumento.codPsInscricao).subscribe((response: any) => {
          this.NgxSpinnerService.hide();

          if (response.statusCode == 200) {
            this.inscricao = response.result;

            this.IngressoService.ListarStatusPromocao(this.analiseDocumento.codPsInscricao, this.analiseDocumento.codPsStatusReq, '5').subscribe((response: any) => {
              if (response.statusCode == 200) {
                this.verificaStatusAprovacao(this.analiseDocumento.codPsStatusReq)
                this.listaStatusAprovacao = response.result;
              }
              else if (response.statusCode == 400) {
                this.toastr.error(response.message);
              } else {
                this.toastr.warning(response.message);
              }
            });
          }
          else if (response.statusCode == 400) {
            this.toastr.error(response.message);
          } else {
            this.toastr.warning(response.message);
          }
        });
      }
      else if (response.statusCode == 400) {
        this.NgxSpinnerService.hide();

        this.toastr.error(response.message);
      } else if (response.statusCode == 404) {
        this.NgxSpinnerService.hide();

        this.toastr.warning(response.message);
      }
      else {
        this.NgxSpinnerService.hide();

        this.toastr.warning("Diploma não encontrado");
      }
    });
  }

    // ESSE MÉTODO IRÁ VERIFICAR SE O STATUS DA APROVAÇÃO É IGUAL A APROVADO OOU REPEOVADO SE SIM ENTÃO BLOQUEAR O COMBO STATUS E NOTA JUNTAMENTE COM O BOTÃO SALVAR
    public verificaStatusAprovacao(codPsStatusReq: number) {
      if (codPsStatusReq == StatusAprovacao.Aprovado || codPsStatusReq == StatusAprovacao.Reprovado) {
        this.liberarCampos = false;
        // SETANDO O STATUS NO COMBO
        this.statusAprovacao = codPsStatusReq;
      }
    }


  baixarArquivo(arquivo: any) {
    const linkSource = arquivo.base64;
    const downloadLink = document.createElement("a");
    const fileName = arquivo.nome;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  onSubmitStatusAprovacao(analiseDocumento: any) {

    this.NgxSpinnerService.show();

    analiseDocumento.codPsStatusReq = this.statusAprovacao;

    var request = {
      codPsReqAnalise: analiseDocumento.codPsReqAnalise,
      codPsStatusReq: analiseDocumento.codPsStatusReq,
      comentario: analiseDocumento.comentario,
      nota: analiseDocumento.nota
    }

    this.IngressoService.AtualizarAnalise(request).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 200) {
        this.toastr.success("Status atualizado com sucesso!");

        this.listaStatusAprovacao = [];

        this.analiseDocumento.comentario = null;

        this.formAnaliseDocumento.resetForm();

        this.ngOnInit();
      }
      else if (response.statusCode == 400) {
        this.toastr.error(response.message);
      }
      else {
        this.toastr.warning(response.message);
      }
    });
  }
}
