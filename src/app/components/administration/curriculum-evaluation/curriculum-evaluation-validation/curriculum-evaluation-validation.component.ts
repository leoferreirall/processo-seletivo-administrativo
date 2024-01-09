import { Component, OnInit, ViewChild } from '@angular/core';
import { IngressoService } from '@services/ingresso.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { StatusAprovacao } from 'src/app/Models/status-aprovacao.enum';

declare var $: any;

@Component({
  selector: 'app-curriculum-evaluation-validation',
  templateUrl: './curriculum-evaluation-validation.component.html',
  styleUrls: ['./curriculum-evaluation-validation.component.scss']
})
export class CurriculumEvaluationValidationComponent implements OnInit {
  @ViewChild('formAvaliacaoCurricular') formAvaliacaoCurricular: NgForm;

  id: any;
  avaliacaoCurricular: any = {};
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
        this.avaliacaoCurricular = response.result;

        this.IngressoService.GetInscricaoById(this.avaliacaoCurricular.codPsInscricao).subscribe((response: any) => {
          this.NgxSpinnerService.hide();

          if (response.statusCode == 200) {
            this.inscricao = response.result;

            this.IngressoService.ListarStatusPromocao(this.avaliacaoCurricular.codPsInscricao, this.avaliacaoCurricular.codPsStatusReq, '4').subscribe((response: any) => {
              if (response.statusCode == 200) {
                this.verificaStatusAprovacao(this.avaliacaoCurricular.codPsStatusReq)
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

  baixarArquivo(arquivo: any) {
    const linkSource = arquivo.base64;
    const downloadLink = document.createElement("a");
    const fileName = arquivo.nome;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  // ESSE MÉTODO IRÁ VERIFICAR SE O STATUS DA APROVAÇÃO É IGUAL A APROVADO OOU REPEOVADO SE SIM ENTÃO BLOQUEAR O COMBO STATUS E NOTA JUNTAMENTE COM O BOTÃO SALVAR
  public verificaStatusAprovacao(codPsStatusReq: number) {
    if (codPsStatusReq == StatusAprovacao.Aprovado || codPsStatusReq == StatusAprovacao.Reprovado) {
      this.liberarCampos = false;
      // SETANDO O STATUS NO COMBO
      this.statusAprovacao = codPsStatusReq;
    }
  }

  onSubmitStatusAprovacao(avaliacaoCurricular: any) {

    if (!this.avaliacaoCurricular.nota) {
      this.toastr.error("Favor informar a nota!");
      return;
    }

    if (Number(String(this.avaliacaoCurricular.nota).replace(/[^0-9]/g, "")) > 1000) {
      this.toastr.error("Favor informar uma nota igual ou menor que 10,00.");
      return;
    }

    this.NgxSpinnerService.show();
    alert(this.avaliacaoCurricular.nota)
    if (avaliacaoCurricular.nota != null)
      avaliacaoCurricular.nota = avaliacaoCurricular.nota.toString().replace(/[^0-9]/g, "");

    avaliacaoCurricular.codPsStatusReq = this.statusAprovacao;

    var request = {
      codPsReqAnalise: avaliacaoCurricular.codPsReqAnalise,
      codPsStatusReq: avaliacaoCurricular.codPsStatusReq,
      comentario: avaliacaoCurricular.comentario,
      nota: avaliacaoCurricular.nota
    }

    this.IngressoService.AtualizarAnalise(request).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 200) {
        this.toastr.success("Status atualizado com sucesso!");

        this.listaStatusAprovacao = [];

        this.avaliacaoCurricular.comentario = null;

        this.formAvaliacaoCurricular.resetForm();

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


  onBlurNota(event: any) {
    if (event.target.value !== '') {
      this.avaliacaoCurricular.nota = event.target.value;
    }
  }
}
