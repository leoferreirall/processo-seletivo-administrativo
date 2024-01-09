import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { IngressoService } from '@services/ingresso.service';

declare var $: any;

@Component({
  selector: 'app-enem',
  templateUrl: './enem.component.html',
  styleUrls: ['./enem.component.scss']
})
export class EnemComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  table: any;
  
  data: any = [];
  enem: any = {};
  
  statusAprovacao: any = 1;

  listaStatusAprovacao: any[] = [
    { descricao: 'Análise coordenador', status: 1 },
    { descricao: 'Aprovação candidato', status: 6 },
    { descricao: 'Reanálise coordenador', status: 8 }
  ];

  constructor(private Router: Router, 
    public IngressoService: IngressoService, 
    private chRef: ChangeDetectorRef,
    private toastr: ToastrService,
    private NgxSpinnerService: NgxSpinnerService
    ) {
  }
  
  ngOnInit() {
    this.onChangeStatusAprovacao(this.statusAprovacao);
  }

  onChangeStatusAprovacao(statusAprovacao: any) {
    this.NgxSpinnerService.show();

    this.IngressoService.ListarEnemByStatus(statusAprovacao).subscribe((response: any) => {
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

      //$.fn.dataTable.ext.classes.sPageButton = '';

      this.table = this.table.DataTable(environment.tableOptions);
    });
  }
}
