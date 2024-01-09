import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '@services/report.service';
import { BaseComponent } from '../../base.component';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import * as saveAs from 'file-saver';

declare var $: any;

@Component({
  selector: 'app-report-geral',
  templateUrl: './report-geral.component.html',
  styleUrls: ['./report-geral.component.scss']
})
export class ReportGeralComponent extends BaseComponent implements OnInit {
  @ViewChild('formReport') formreport: NgForm;

  data: any = [];
  listaTipoCurso: any[] = [];
  listaUnidades: any[] = [];
  listaCategoria: any[] = [];
  listaPeriodoLetivo: any[] = [];
  listaCursos: any[] = [];
  listaTurnos: any[] = [];
  listaFormaIngresso: any[] = [];

  masterSelected: boolean = false;

  report: any = {
    codColigada: null,
    codTipoCurso: null,
    codFilial: null,
    idCategoriaPs: null,
    idPerLet: null,
    cursos: null,
    turnos: null,
    formasIngresso: null,
  };

  constructor(private toastr: ToastrService,
    private ReportService: ReportService,
    private chRef: ChangeDetectorRef,
    private NgxSpinnerService: NgxSpinnerService) {
    super();
  }

  ngOnInit() {
    this.NgxSpinnerService.show();

    this.ReportService.GetTipoCurso().subscribe((response: any) => {
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
  }

  onChangeTipoCurso(codColigada: any, codTipoCurso: any) {

    this.listaUnidades = [];
    this.listaCategoria = [];
    this.listaPeriodoLetivo = [];
    this.listaCursos = [];
    this.listaTurnos = [];
    this.listaFormaIngresso = [];

    this.report.codColigada = codColigada;
    this.report.codTipoCurso = codTipoCurso;
    this.report.codFilial = null;
    this.report.idCategoriaPs = null;
    this.report.idPerLet = null;
    this.report.cursos = null;
    this.report.turnos = null;
    this.report.formasIngresso = null;

    this.NgxSpinnerService.show();

    this.ReportService.GetUnidade(codColigada, codTipoCurso).subscribe((response: any) => {
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

    this.listaCategoria = [];
    this.listaPeriodoLetivo = [];
    this.listaCursos = [];
    this.listaTurnos = [];
    this.listaFormaIngresso = [];

    this.report.idCategoriaPs = null;
    this.report.idPerLet = null;
    this.report.cursos = null;
    this.report.turnos = null;
    this.report.formasIngresso = null;

    this.NgxSpinnerService.show();

    this.ReportService.GetCategoria(codColigada, codTipoCurso, codFilial).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      this.listaCategoria = response.result;
    });
  }

  onChangeCategoria(codColigada: any, codTipoCurso: any, codFilial: any, idCategoriaPs: any) {

    this.listaPeriodoLetivo = [];
    this.listaCursos = [];
    this.listaTurnos = [];
    this.listaFormaIngresso = [];

    this.report.idPerLet = null;
    this.report.cursos = null;
    this.report.turnos = null;
    this.report.formasIngresso = null;

    this.NgxSpinnerService.show();

    this.ReportService.GetPeriodoLetivo(codColigada, codTipoCurso, codFilial, idCategoriaPs).subscribe((response: any) => {
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

  onChangePeriodoLetivo(codColigada: any, codTipoCurso: any, codFilial: any, idCategoriaPs: any, idPerLet: any) {

    this.listaCursos = [];
    this.listaTurnos = [];
    this.listaFormaIngresso = [];

    this.report.cursos = null;
    this.report.turnos = null;
    this.report.formasIngresso = null;

    this.NgxSpinnerService.show();

    this.ReportService.GetCurso(codColigada, codTipoCurso, codFilial, idCategoriaPs, idPerLet).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      this.listaCursos = response.result;
    });
  }

  onChangeCurso(report: any) {
    this.report.cursos.remove(0);

    this.listaTurnos = [];
    this.listaFormaIngresso = [];

    this.report.turnos = null;
    this.report.formasIngresso = null;

    this.NgxSpinnerService.show();

    this.ReportService.GetTurno(report).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      this.listaTurnos = response.result;
    });
  }

  onChangeTurno(report: any) {
    this.report.turnos.remove(0);

    this.listaFormaIngresso = [];

    this.report.formasIngresso = null;

    this.NgxSpinnerService.show();

    this.ReportService.GetFormaIngresso(report).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      this.listaFormaIngresso = response.result;
    });
  }

  onChangeFormaIngresso() {
    this.report.formasIngresso.remove(0);
  }


  onChangeSelect(event: any, lista: any, nomeListaSelecionada: any, coluna: any) {

    if (event.target.index == 0) {
      if (event.target.selected) {
        this.report[nomeListaSelecionada] = [0];

        this.report[nomeListaSelecionada] = this.report[nomeListaSelecionada].concat(lista.map(item => item[coluna]));
      } else {
        this.report[nomeListaSelecionada] = [];
      }
    } else {
      this.report[nomeListaSelecionada].remove(0);

      if (this.report[nomeListaSelecionada].length == lista.length) {
        this.report[nomeListaSelecionada] = [0];

        this.report[nomeListaSelecionada] = this.report[nomeListaSelecionada].concat(lista.map(item => item[coluna]));
      }
    }

    let listaSelecionada = this.report[nomeListaSelecionada];

    $("#" + event.target.parentElement.id + " option").each(function () {
      $(this).prop('selected', false);

      if (listaSelecionada.filter(item => {
        return item == $(this)[0].id;
      }).length > 0) {
        $(this).prop('selected', true);
      }
    });
  }

  onSubmitExportar(report) {
    if (!report.codTipoCurso) {
      this.toastr.warning("Favor selecionar o tipo de curso");
    } else if (!report.codFilial) {
      this.toastr.warning("Favor selecionar a unidade");
    } else if (!report.idCategoriaPs) {
      this.toastr.warning("Favor selecionar a categoria");
    } else if (!report.idPerLet) {
      this.toastr.warning("Favor selecionar a periodo letivo");
    } else if (report.cursos.length == 0) {
      this.toastr.warning("Favor selecionar um curso");
    } else if (report.turnos.length == 0) {
      this.toastr.warning("Favor selecionar um turno");
    } else if (report.formasIngresso.length == 0) {
      this.toastr.warning("Favor selecionar uma forma de ingresso");
    } else {
      this.exportar(report);
    }
  }

  exportar(report) {

    this.NgxSpinnerService.show();

    this.ReportService.Exportar(report).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      let contentDisposition = response.headers.get('content-disposition');

      if (contentDisposition) {
        let body = response.body;

        let filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();

        saveAs(body, filename);
      } else {
        this.toastr.error("Erro ao realizar download", null, {
          disableTimeOut: true,
        });
      }
    });

    this.report.areaInteresseChecked = [];
  }

}
