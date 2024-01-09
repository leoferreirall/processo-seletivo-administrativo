import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IngressoService } from '@services/ingresso.service';
import { ConvenioService } from '@services/convenio.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-canvas-corretion',
  templateUrl: './canvas-corretion.component.html',
  styleUrls: ['./canvas-corretion.component.scss']
})
export class CanvasCorretionComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  table: any;

  data: any = [];
  listaTipoCurso: any[] = [];
  listaUnidades: any[] = [];
  listaCategorias: any[] = [];
  listaPeriodoLetivo: any[] = [];

  model: any = {};

  constructor(private Router: Router,
    public IngressoService: IngressoService,
    private ConvenioService: ConvenioService,
    private chRef: ChangeDetectorRef,
    private toastr: ToastrService,
    private NgxSpinnerService: NgxSpinnerService
  ) {
  }

  ngOnInit() {
    this.NgxSpinnerService.show();

    this.IngressoService.ListarCorrecoesCanvas().subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      if (this.table) {
        this.table.clear()
          .destroy();
      }

      this.data = response.result;

      this.chRef.detectChanges();

      this.table = $('table');

      var options: any = environment.tableOptions;

      options.order = [[ 4, "asc" ]];

      this.table = this.table.DataTable(environment.tableOptions);
    });
  }

  onSubmitForm(model: any) {
    model.idPerLet = Number(model.idPerLet);
    model.idCategoriaPs = Number(model.idCategoriaPs);
    model.courseId = Number(model.courseId);

    if (!model.idPerLet) {
      this.toastr.warning("Favor informar o período letivo");

      return;
    } else if (!model.courseId) {
      this.toastr.warning("Favor informar o course id");

      return;
    }

    this.NgxSpinnerService.show();

    this.IngressoService.InserirDisciplinaCanvas(model).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      this.ngOnInit();

      this.toastr.success("Dados cadastrados com sucesso!");

      $('#modal').modal('hide');
    });
  }

  novo() {
    this.model = {};

    this.NgxSpinnerService.show();

    this.ConvenioService.GetTipoCurso().subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      this.listaTipoCurso = response.result;
    });

    $('#modal').modal('show');
  }

  finalizarCorrecao(codPsConfigMod: number) {
    Swal.fire({
      title: '<strong style="color:#ff5c00">Confirmação</strong>',
      text: 'Deseja realmente finalizar o período de correção?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#ff5c00'
    }).then((result) => {
      if (result.isConfirmed) {
        this.NgxSpinnerService.show();

        this.IngressoService.FinalizarCorrecaoCanvasById(codPsConfigMod).subscribe((response: any) => {
          this.NgxSpinnerService.hide();

          if (response.statusCode == 200) {
            this.toastr.success("Processo de correção finalizado com sucesso!");

            this.ngOnInit();
          } else {
            this.toastr.error(response.message);
          }
        });
      }
    });
  }

  onChangeTipoCurso(codColigada: any, codTipoCurso: any) {
    this.model.codColigada = codColigada;
    this.model.codTipoCurso = codTipoCurso;

    $("#codFilial").val("");

    this.model.codFilial = null;
    this.model.idCategoriaPs = null;
    this.model.idPerLet = null;

    this.listaUnidades = [];
    this.listaCategorias = [];
    this.listaPeriodoLetivo = [];

    this.NgxSpinnerService.show();

    this.ConvenioService.GetUnidade(codColigada, codTipoCurso).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      this.listaUnidades = response.result;
    });
  }

  onChangeUnidade(codColigada: any, codTipoCurso: any, codFilial: any) {
    $("#idCategoriaPs").val("");

    this.model.idCategoriaPs = null;
    this.model.idPerLet = null;

    this.listaCategorias = [];
    this.listaPeriodoLetivo = [];

    this.NgxSpinnerService.show();

    this.ConvenioService.GetCategoria(codColigada, codTipoCurso, codFilial).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      this.listaCategorias = response.result;
    });
  }

  onChangeCategoria(codColigada: any, codTipoCurso: any, codFilial: any, idCategoriaPs: any) {
    $("#idPerLet").val("");

    this.model.idPerLet = null;

    this.listaPeriodoLetivo = [];

    this.NgxSpinnerService.show();

    this.ConvenioService.GetPeriodoLetivo(codColigada, codTipoCurso, codFilial, idCategoriaPs).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      this.listaPeriodoLetivo = response.result;
    });
  }
}
