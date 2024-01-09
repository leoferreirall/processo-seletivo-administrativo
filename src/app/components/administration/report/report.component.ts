import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConvenioService } from '@services/convenio.service';
import { OfertaService } from '@services/oferta.service';
import { PsService } from '@services/ps.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { ReportService } from '@services/report.service';
import { NgxMaskModule } from 'ngx-mask';
import { BaseComponent } from '../../base.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent extends BaseComponent implements OnInit {
  @ViewChild('formReport') formReport: NgForm;

  cpfmask: string = "000.000.000-00";
  telmask: string = "(00) 0?0000-0000";

  data: any = [];
  table: any;

  report: any = {
    nome: null,
    cpf: null,
    rg: null,
    celular: null
  };

  constructor(private toastr: ToastrService,
    private ReportService: ReportService,
    private NgxSpinnerService: NgxSpinnerService,
    private chRef: ChangeDetectorRef) { 
      super();
    }

  ngOnInit() { }

  onSubmitPesquisar(report) {
     if (report.cpf || report.rg || report.celular || report.nome) {
      this.pesquisar(report);
     } else {
      this.toastr.warning("Favor informar um filtro!");       
    }
  }

  pesquisar(report) {

    this.NgxSpinnerService.show();

    this.data = [];

    if(report.cpf != null)
    report.cpf = report.cpf.replace(/[^0-9]/g, "");

    this.ReportService.Post(report).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      if (response.result.length > 0)
      {
        this.data = response.result;

        if (this.table) {
          this.table.clear()
            .destroy();
        }      

      this.chRef.detectChanges();

      this.table = $('table');

      this.table = this.table.DataTable(environment.tableOptions);
      }
      else
      {
        if (this.table) {
          this.table.clear()
            .destroy();
        }  
        this.chRef.detectChanges();

        this.table = $('table');
        this.table = this.table.DataTable(environment.tableOptions);
        this.toastr.info("Nenhum registo encontrado!");
      }      
    });
  } 

}
