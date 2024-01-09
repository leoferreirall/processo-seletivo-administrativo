import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgxSpinnerService } from "ngx-spinner";

import { ReportService } from '@services/report.service';

@Component({
  selector: 'app-trilha',
  templateUrl: './trilha.component.html',
  styleUrls: ['./trilha.component.scss']
})
export class TrilhaComponent implements OnInit {
  id: any;
  nome: any;

  trilhas: any = [];

  modal: any = {
    codpsaudithistorico: null
  };
  

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private ReportService: ReportService,
    private NgxSpinnerService: NgxSpinnerService) {
    
  }

  ngOnInit(): void {
    this.NgxSpinnerService.show();

    this.id = this.ActivatedRoute.snapshot.paramMap.get("id");

    this.ReportService.GetTrilha(this.id).subscribe((response: any) => {
      
      if(response.statusCode === 200){

        if (response.result.length > 0)
        {
          this.nome = response.result[0].nome;

          this.trilhas = response.result;
        }
       
      }

      this.NgxSpinnerService.hide();
    });
  }

  openModal(codpsaudithistorico: any){
    this.NgxSpinnerService.show();

    this.ReportService.DetalhamentoAuditHistorico(codpsaudithistorico).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if(response.statusCode === 200){
        this.modal.codpsaudithistorico = response.result;
      }
    });
  }

}
