import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { IngressoService } from '@services/ingresso.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { StatusReq } from 'src/app/Models/StatusReq';
import { StatusAprovacao } from 'src/app/Models/status-aprovacao.enum';
import { Regex } from 'src/app/Helpers/Regex';

declare var $: any;

@Component({
  selector: 'app-university-exam-corretion',
  templateUrl: './university-exam-corretion.component.html',
  styleUrls: ['./university-exam-corretion.component.scss']
})
export class UniversityExamCorretionComponent implements OnInit {

  id: any;
  prova: any = {};
  inscricao: any = {};
  public disabled = false;

  constructor(private http: HttpClient,
    private toastr: ToastrService,
    private IngressoService: IngressoService,
    private Router: Router,
    private ActivatedRoute: ActivatedRoute,
    private NgxSpinnerService: NgxSpinnerService) {
  }

  ngOnInit() {
    this.id = this.ActivatedRoute.snapshot.paramMap.get("id");

    this.NgxSpinnerService.show();

    this.IngressoService.GetProvaById(this.id).subscribe((response: any) => {
      if (response.statusCode == 200 && response.result != null) {
        this.prova = response.result;

        //ENVIAR O CODIGO STATUS DO REQUISITO
        this.verificaStatusRequisito(response.result.codPsStatusReq);

        this.IngressoService.GetInscricaoById(this.prova.codPsInscricao).subscribe((response: any) => {
          this.NgxSpinnerService.hide();

          if (response.statusCode == 200) {
            this.inscricao = response.result;
          }
          else if (response.statusCode == 400) {
            this.toastr.error(response.message);
          } else if (response.statusCode == 404) {
            this.toastr.warning(response.message);
          }
        });
      } else if (response.statusCode == 400) {
        this.NgxSpinnerService.hide();

        this.toastr.error(response.message);
      } else if (response.statusCode == 404) {
        this.NgxSpinnerService.hide();

        this.toastr.warning(response.message);
      }
    });
  }

  //ESSA FUNÇÃO IRA VERIFICAR SE A AVALIAÇÃO ESTÁ APROVADA OU REPOVADA E SE ESTIVER IRÁ ATRIBUIR TRUE PARA A VARIAVEL DISABLED, PARA COM ISSO BLOQUEAR OS CAMPOS NECESSÁRIOS
  verificaStatusRequisito(CodPsStatusReq: number): void {
    this.disabled = CodPsStatusReq == StatusAprovacao.Aprovado || CodPsStatusReq == StatusAprovacao.Reprovado;
    this.prova.aprovado = CodPsStatusReq == StatusAprovacao.Aprovado || CodPsStatusReq == StatusAprovacao.PendenteCorrecao;
  }

  onSubmitFormProva(prova: any) {
    this.NgxSpinnerService.show();

    prova.nota = prova.nota;

    this.IngressoService.CorrecaoProva(prova).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 200) {
        this.toastr.success("Nota enviada com sucesso!");

        this.Router.navigateByUrl("/administrativo/provas");
      }
      else if (response.statusCode == 404) {
        this.toastr.warning(response.message);
      }
      else {
        this.toastr.error(response.message);
      }
    });
  }

  onBlur(event: any) {
    if (event.target.value !== '') {
      if (Regex.deixarApenasNumeros(event.target.value) > 10) {
        event.target.value = Number(10).toFixed(2);
      } else {
        event.target.value = parseFloat(event.target.value).toFixed(2);
      }
    }
  }
}
