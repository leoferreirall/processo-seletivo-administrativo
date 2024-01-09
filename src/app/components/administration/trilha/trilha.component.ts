import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgxSpinnerService } from "ngx-spinner";

import { ReportService } from '@services/report.service';
import { jsPDF } from "jspdf";
import { BaseComponent } from '../../base.component';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-trilha',
  templateUrl: './trilha.component.html',
  styleUrls: ['./trilha.component.scss']
})
export class TrilhaComponent extends BaseComponent implements OnInit {

  @ViewChild('ExportarPdf', { static: false }) el: ElementRef;

  id: any;
  btnPdfVisible = true;


  usuario: any = {
    codPsUsuario: null,
    nome: null,
    cpf: null,
    rg: null,
    dtNascimento: null,
    sexo: null
  };

  trilhas: any = [];
  de: any = [];
  para: any = [];

  modal: any = {
    codpsaudithistorico: null
  };


  constructor(
    private ActivatedRoute: ActivatedRoute,
    private ReportService: ReportService,
    private NgxSpinnerService: NgxSpinnerService,
    private chRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {

    this.NgxSpinnerService.show();

    this.id = this.ActivatedRoute.snapshot.paramMap.get("id");

    this.ReportService.GetTrilha(this.id).subscribe((response: any) => {

      if (response.statusCode === 200) {

        if (response.result.length > 0) {
          this.usuario.codPsUsuario = response.result[0].codPsUsuario;
          this.usuario.nome = response.result[0].nome;
          this.usuario.cpf = response.result[0].cpf;
          this.usuario.rg = response.result[0].rg;
          this.usuario.dtNascimento = response.result[0].dtNascimento;
          this.usuario.sexo = response.result[0].sexo;

          this.trilhas = response.result;
        }

      }

      this.NgxSpinnerService.hide();
    });
  }

  exportaExcel() {
    var width = this.el.nativeElement.scrollWidth;
    var heigth = this.el.nativeElement.clientHeight;
    var perWidth = this.el.nativeElement.scrollWidth * 0.15;

    let pdf = new jsPDF('l', 'px', [width, 1080]);

    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('web.pdf');
      }
    });
  };

  openModal(codpsaudithistorico: any) {
    this.NgxSpinnerService.show();

    this.ReportService.DetalhamentoAuditHistorico(codpsaudithistorico).subscribe((response: any) => {

      this.NgxSpinnerService.hide();

      if (response.statusCode === 200) {
        if (response.result != null) {
          this.de = JSON.stringify(response.result.de);
          this.para = JSON.stringify(response.result.para);
        }
      }
    });
  }

}
