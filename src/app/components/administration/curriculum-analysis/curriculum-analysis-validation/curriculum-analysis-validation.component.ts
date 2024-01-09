import { Component, OnInit, ViewChild } from '@angular/core';
import { IngressoService } from '@services/ingresso.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { StatusAprovacao } from 'src/app/Models/status-aprovacao.enum';

declare var $: any;

@Component({
  selector: 'app-curriculum-analysis-validation',
  templateUrl: './curriculum-analysis-validation.component.html',
  styleUrls: ['./curriculum-analysis-validation.component.scss']
})
export class CurriculumAnalysisValidationComponent implements OnInit {
  @ViewChild('formAnaliseCurricular') formAnaliseCurricular: NgForm;

  id: any;
  analiseCurricular: any = {};
  inscricao: any = {};
  files: File[] = [];
  liberarCampos = true;

  statusAprovacao: any;
  statusAprovacaoEnum = StatusAprovacao;

  listaStatusAprovacao: any[] = [];

  listaInstituicoes: any[] = [];
  listaGrade: any[] = [];
  listaPeriodoIngresso: any[] = [];

  codGrade: any;
  periodoIngresso: any;

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
        this.analiseCurricular = response.result;

        this.IngressoService.GetInscricaoById(this.analiseCurricular.codPsInscricao).subscribe((response: any) => {
          this.NgxSpinnerService.hide();

          if (response.statusCode == 200) {
            this.inscricao = response.result;

            if(this.analiseCurricular.codPsStatusReq == StatusAprovacao.AprovacaoCandidato){
              this.IngressoService.ListarMatrizByInscricao(this.analiseCurricular.codPsInscricao).subscribe((response: any) => {
                if (response.statusCode == 200) {
                  this.listaGrade = response.result;
                }
                else if (response.statusCode == 400) {
                  this.toastr.error(response.message);
                } else {
                  this.toastr.warning(response.message);
                }
              });

              this.IngressoService.ListarInstituicoes().subscribe((response: any) => {
                if (response.statusCode == 200) {
                  this.listaInstituicoes = response.result;
                }
                else if (response.statusCode == 400) {
                  this.toastr.error(response.message);
                } else {
                  this.toastr.warning(response.message);
                }
              });
            }

            this.IngressoService.ListarStatusPromocao(this.analiseCurricular.codPsInscricao, this.analiseCurricular.codPsStatusReq, '3').subscribe((response: any) => {
              if (response.statusCode == 200) {
                this.verificaStatusAprovacao(this.analiseCurricular.codPsStatusReq);
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

  onChangeGrade(codPsInscricao: any, codGrade: any) {
    this.periodoIngresso = null;

    this.NgxSpinnerService.show();

    this.IngressoService.ListarPeriodoIngressoByInscricao(codPsInscricao, codGrade).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 200) {
        this.listaPeriodoIngresso = response.result;
      } else if (response.statusCode == 404) {
        this.toastr.warning(response.message);
      } else {
        this.toastr.error(response.message);
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

  onSubmitStatusAprovacao(analiseCurricular: any) {
    this.NgxSpinnerService.show();

    analiseCurricular.codPsStatusReq = this.statusAprovacao;

    var request = {
      codPsReqAnalise: analiseCurricular.codPsReqAnalise,
      codPsStatusReq: analiseCurricular.codPsStatusReq,
      comentario: analiseCurricular.comentario,
      nota: this.analiseCurricular.nota != null ? this.analiseCurricular.nota.toString().replace(/[^0-9]/g, "") : null
    }

    this.IngressoService.AtualizarAnalise(request).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 200) {
        this.toastr.success("Status atualizado com sucesso!");

        this.listaStatusAprovacao = [];
        this.listaGrade = [];

        this.analiseCurricular.comentario = null;

        this.formAnaliseCurricular.resetForm();

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

  onSubmitCriarHabilitacao() {
    if(this.analiseCurricular.idCategoriaPs == 5 && this.analiseCurricular.codPsFormaIngressoDominio == 1){

      if(!this.analiseCurricular.nota){
        this.toastr.warning("Favor informar a nota!");
        return;
      }

      if(this.analiseCurricular.nota && this.analiseCurricular.nota.replaceAll(',','') > 1000){
        this.toastr.error("Favor informar uma nota igual ou menor que 10,00.");
        return;
      }
    }

    var habilitacao = {
      codPsInscricao: this.inscricao.codPsInscricao,
      codPsRequisitos: this.analiseCurricular.codPsRequisitos,
      idHabilitacaoFilial: this.periodoIngresso.idHabilitacaoFilial,
      codPeriodo: this.periodoIngresso.codPeriodo,
      instituicao: this.analiseCurricular.instituicao,
      nota: this.analiseCurricular.idCategoriaPs == 5 && this.analiseCurricular.codPsFormaIngressoDominio == 1 ? this.analiseCurricular.nota : null
    };

    this.NgxSpinnerService.show();

    this.IngressoService.CriarHabilitacaoAnalise(this.id, habilitacao, this.files).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 200) {
        this.toastr.success("Habilitação cadastrada com sucesso!");

        this.Router.navigateByUrl("/administrativo/analise-curricular");
      }
      else if (response.statusCode == 400) {
        this.toastr.error(response.message);
      }
      else {
        this.toastr.warning(response.message);
      }
    });
  }

  onSubmitArquivos(codPsReqAnalise: any, files: any){
    this.NgxSpinnerService.show();

    this.IngressoService.EnviarArquivosAnalise(codPsReqAnalise, files).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 200) {
        this.analiseCurricular = response.result;

        this.toastr.success("Arquivos enviado com sucesso!");

        var fileName = document.getElementById('file-label');

        fileName.textContent = "Selecione um ou mais arquivos";

        this.files = null;
      } else {
        if (response.message) {
          this.toastr.error(response.message);
        } else {
          this.toastr.error("Erro ao realizar importação", null, {
            disableTimeOut: true,
          });
        }
      }
    });
  }

  onChangeFile(event: any) {
    if (event.target.files.length > 0) {
      this.files = event.target.files;

      var fileName = document.getElementById('file-label');

      fileName.textContent = "";

      for (const file of this.files) {
        fileName.textContent += '"' + file.name + '" ';
      }
    }
  }

  onBlur(event: any) {
    if (event.target.value !== '') {
      this.analiseCurricular.nota = event.target.value;
    }
  }
}
