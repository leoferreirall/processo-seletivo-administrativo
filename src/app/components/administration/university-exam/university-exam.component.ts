import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IngressoService } from '@services/ingresso.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { StatusReq } from 'src/app/Models/StatusReq';
import { Provas } from 'src/app/Models/Provas';
import { FiltroProvas } from 'src/app/Models/FiltroProvas';

declare var $: any;

@Component({
  selector: 'app-university-exam',
  templateUrl: './university-exam.component.html',
  styleUrls: ['./university-exam.component.scss']
})
export class UniversityExamComponent implements OnInit {
  table: any;

  public data = [] as any;
  public plano = {} as any;
  public status = [] as StatusReq[];
  private tableOptions = environment.tableOptions;
  dtOptions: DataTables.Settings = {};
  public listProvas = [] as Provas[];
  public carregando = true;
  public modelFiltro = {} as FiltroProvas;

  constructor(private Router: Router,
    public IngressoService: IngressoService,
    private chRef: ChangeDetectorRef,
    private toastr: ToastrService,
    private NgxSpinnerService: NgxSpinnerService
  ) {
  }

  ngOnInit() {
    this.ListarStatus();
    this.adcionandoConfigTable();
    //ATIVANDO OS TOOLTIPS
    $('[data-toggle="tooltip"]').tooltip()
  }

  get deAteCorrecao(): string {
    return `${this.modelFiltro.deDataCorrecao?.toLocaleString()}_${this.modelFiltro.ateDataCorrecao?.toLocaleString()}`
  }
  get deAteRealizacao(): string {
    return `${this.modelFiltro.deDataRealizacao?.toLocaleString()}_${this.modelFiltro.ateDataRealizacao?.toLocaleString()}`
  }
  get retornaDataTable(): any {
    var table = $('table').DataTable();
    return table;
  }

  // private ListarAvaliacoes() {
  //   this.NgxSpinnerService.show();

  //   this.IngressoService.ListarAvaliacoes().subscribe(
  //     {
  //       next: (response: any) => {
  //         this.data = response.result;

  //         this.chRef.detectChanges();

  //         this.table = $('table');

  //         this.table = this.table.DataTable(environment.tableOptions);
  //       },
  //       error: (error: any) => {
  //         if (error.statusCode == 404) {
  //           this.toastr.warning(error.message);
  //         } else if (error.statusCode != 200) {
  //           this.toastr.error(error.message);
  //         }
  //       },
  //       complete: () => {
  //         this.NgxSpinnerService.hide();
  //       }
  //     })
  // };

  private ListarStatus() {
    this.IngressoService.ListarSituacoesPorAvaliacoes().subscribe({
      next: (statusResponse: any) => {
        statusResponse.result.forEach(status => {
          this.criarStatus(status);
        })
      },
      error: (error: any) => {
        this.toastr.error(error.message);
      }
    })
  }

  private criarStatus(status: StatusReq) {
    this.status.push(status);
  }

  private adcionandoConfigTable() {
    this.NgxSpinnerService.show();
    this.dtOptions = {
      lengthChange: this.tableOptions.bLengthChange,
      pagingType: this.tableOptions.pagingType,
      responsive: true,
      paging: this.tableOptions.paging,
      ordering: this.tableOptions.ordering,
      info: true,
      processing: true,
      pageLength: this.tableOptions.pageLength,
      language: {
        emptyTable: "Nenhum registro encontrado",
        info: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        infoEmpty: "Mostrando 0 até 0 de 0 registros",
        infoFiltered: "(Filtrados de _MAX_ registros)",
        infoPostFix: "",
        lengthMenu: "_MENU_ resultados por página",
        loadingRecords: "Carregando...",
        processing: "Processando...",
        zeroRecords: "Nenhum registro encontrado",
        search: "Pesquisar:",
        paginate: {
          next: "Próximo",
          previous: "Anterior",
          first: "Primeiro",
          last: "Último"
        },
        aria: {
          sortAscending: ": Ordenar colunas de forma ascendente",
          sortDescending: ": Ordenar colunas de forma descendente"
        },
      },
      serverSide: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.IngressoService.ListarAvaliacoes(dataTablesParameters).subscribe(
          {
            next: (resp: any) => {
              this.listProvas = resp.result.data;
              callback({
                recordsTotal: resp.result.recordsTotal,
                recordsFiltered: resp.result.recordsFiltered,
                data: []
              });
            },
            error: (error: any) => {
              this.toastr.error(error.message);
            },
            complete: () => {
              this.NgxSpinnerService.hide();
              this.carregando = false;
            }
          });
      },
      order: [[2, 'desc']],
      columns: [
        { data: 'CodPsReqAvaliacao' },
        { data: 'NomeCandidato' },
        { data: 'DataRealizacao' },
        { data: 'NotaRedacao', },
        { data: 'DataCorrecao' },
        { data: 'Comentario' },
        { data: 'DescricaoStatusReq' }
      ],
    };
  }

  public verificaDataRealizacao(): boolean {
    return this.retornaSeNulOuVazio(this.modelFiltro.ateDataRealizacao) || this.retornaSeNulOuVazio(this.modelFiltro.deDataRealizacao);
  }

  public verificaDataCorrecao(): boolean {
    return this.retornaSeNulOuVazio(this.modelFiltro.ateDataCorrecao) || this.retornaSeNulOuVazio(this.modelFiltro.deDataCorrecao);
  }

  private retornaSeNulOuVazio(valor: any): boolean {
    return valor == null || valor == undefined || valor == '';
  }

  public filtrarDataCorrecao(): void {
    if (!this.verificaDataCorrecao()) {
      var table = this.retornaDataTable;
      table.columns(4).search(this.deAteCorrecao).draw();
    }
  }

  public filtrarDataRealizacao(): void {
    if (!this.verificaDataRealizacao()) {
      var table = this.retornaDataTable;
      table.columns(2).search(this.deAteRealizacao).draw();
    }
  }

  public filtroPorStatus(event: any) {
    var pesquisa = String(event.target.value);
    var table = this.retornaDataTable;
    if (pesquisa.toLocaleLowerCase() == 'todos')
      pesquisa = '';
    this.modelFiltro.status = pesquisa;
    table.columns(6).search(pesquisa).draw();
  }

  public limparDataRealizacao() {
    this.modelFiltro.ateDataRealizacao = null;
    this.modelFiltro.deDataRealizacao = null;
    var table = this.retornaDataTable;
    table.columns(2).search('').draw();
  }
  public limparDataCorrecao() {
    this.modelFiltro.ateDataCorrecao = null;
    this.modelFiltro.deDataCorrecao = null;
    var table = this.retornaDataTable;
    table.columns(4).search('').draw();
  }

}


