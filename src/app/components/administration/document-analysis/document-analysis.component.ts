import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { IngressoService } from '@services/ingresso.service';
import { environment } from 'src/environments/environment';
import { Select } from 'src/app/Models/Select';
import { CarregarSelect } from 'src/app/Helpers/CarregarSelect';

declare var $: any;

@Component({
  selector: 'app-document-analysis',
  templateUrl: './document-analysis.component.html',
  styleUrls: ['./document-analysis.component.scss']
})
export class DocumentAnalysisComponent implements OnInit {

  dtOptions: DataTables.Settings = {};

  public listaCampus = [] as Select[];
  public listaPeriodoLetivo = [] as Select[];
  public listaModalidade = [] as Select[];
  public listaCurso = [] as Select[];
  public listaTurno = [] as Select[];

  data: any = [];

  statusAprovacao: any = 1;

  listaStatusAprovacao: any[] = [
    { descricao: 'Análise coordenador', status: 1 },
    { descricao: 'Reanálise coordenador', status: 8 },
    { descricao: 'Aprovado', status: 12 },
    { descricao: 'Reprovado', status: 13 }
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

    this.IngressoService.ListarAnaliseByStatus(statusAprovacao, '5').subscribe((response: any) => {
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
      this.listaPeriodoLetivo = CarregarSelect.IdMesmoQueDescricao(response.result, this.listaCampus, 'periodoLetivo');
      this.listaModalidade = CarregarSelect.IdMesmoQueDescricao(response.result, this.listaCampus, 'processoSeletivo');
      this.listaCurso = CarregarSelect.IdMesmoQueDescricao(response.result, this.listaCampus, 'curso');
      this.listaTurno = CarregarSelect.IdMesmoQueDescricao(response.result, this.listaCampus, 'turno');

      this.chRef.detectChanges();

      table = $('table');

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
