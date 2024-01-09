import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { IngressoService } from '@services/ingresso.service';
import { GroupBy } from 'src/app/Helpers/GroupBy';
import { CarregarSelect } from 'src/app/Helpers/CarregarSelect';
import { Select } from 'src/app/Models/Select';

declare var $: any;

@Component({
  selector: 'app-curriculum-analysis',
  templateUrl: './curriculum-analysis.component.html',
  styleUrls: ['./curriculum-analysis.component.scss']
})
export class CurriculumAnalysisComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  data: any = [];

  statusAprovacao: any = 1;

  public listaCampus = [] as Select[];
  public listaModalidade = [] as Select[];
  public listaCursos = [] as Select[];
  public listaTurnos = [] as Select[];
  public listaPeriodosLetivos = [] as Select[];

  listaStatusAprovacao: any[] = [
    { descricao: 'Análise coordenador', status: 1 },
    { descricao: 'Aprovação candidato', status: 6 },
    { descricao: 'Reanálise coordenador', status: 8 },
    { descricao: 'Aprovado', status: 12 }
  ];

  constructor(private Router: Router,
    private IngressoService: IngressoService,
    private chRef: ChangeDetectorRef,
    private toastr: ToastrService,
    private NgxSpinnerService: NgxSpinnerService
  ) {
  }

  get retornaDataTable(): any {
    return $('table').DataTable();
  }

  ngOnInit() {
    this.onChangeStatusAprovacao(this.statusAprovacao, true);
  }

  onChangeStatusAprovacao(statusAprovacao: any, recarregarTable: boolean = false) {
    var table;
    if (!recarregarTable) {
      table = this.retornaDataTable;
    }

    this.NgxSpinnerService.show();

    this.IngressoService.ListarAnaliseByStatus(statusAprovacao, '3').subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);
        return;
      }

      if (table) {
        table.clear()
          .destroy();
      }

      this.data = response.result;

      this.listaCampus = CarregarSelect.IdMesmoQueDescricao(response.result, this.listaCampus, 'campus');

      this.listaModalidade = CarregarSelect.IdMesmoQueDescricao(response.result, this.listaModalidade, 'processoSeletivo');

      this.listaCursos = CarregarSelect.IdMesmoQueDescricao(response.result, this.listaCursos, 'curso');

      this.listaTurnos = CarregarSelect.IdMesmoQueDescricao(response.result, this.listaCursos, 'turno');

      this.listaPeriodosLetivos = CarregarSelect.IdMesmoQueDescricao(response.result, this.listaCursos, 'periodoLetivo');

      this.chRef.detectChanges();

      table = $('table');

      //$.fn.dataTable.ext.classes.sPageButton = '';

      table = table.DataTable(environment.tableOptions);

    });
  }
  public filtroTabela(event: any, coluna: number) {
    var table = this.retornaDataTable;
    var pesquisa = String(event.target.value);
    if (pesquisa.toLocaleLowerCase() == 'todos')
      pesquisa = '';
    table.columns(coluna).search(pesquisa).draw();
  }
}
