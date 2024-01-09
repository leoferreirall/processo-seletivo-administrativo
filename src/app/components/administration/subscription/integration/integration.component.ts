import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IntegracaoService } from '@services/integracao.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss']
})
export class IntegrationComponent implements OnInit, OnDestroy {
  id: any;

  inscricao: any = {};
  atividades: any = [];

  interval: any;

  constructor(private ActivatedRoute: ActivatedRoute,
    private IntegracaoService: IntegracaoService,
    private toastr: ToastrService,
    private NgxSpinnerService: NgxSpinnerService) {
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  ngOnInit() {
    this.id = this.ActivatedRoute.snapshot.paramMap.get("id");

    this.init();

    this.interval = setInterval(() => {
      this.init();
    }, 10000);
  }

  init(){
    this.NgxSpinnerService.show();

    this.IntegracaoService.getInscricaoById(this.id).subscribe(response => {
      if (response.statusCode == 200) {
        this.inscricao = response.result;

        this.IntegracaoService.getListaAtividadesInscricao(this.id).subscribe(response => {
          this.atividades = response.result;
        });
      } else {
        this.toastr.warning(response.message);
      }

      this.NgxSpinnerService.hide();
    });
  }

  reprocessar(id: any) {
    this.NgxSpinnerService.show();

    this.IntegracaoService.ReprocessarInscricao(id).subscribe(response => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 200) {
        this.toastr.success(response.result);

        this.init();
      } else {
        this.toastr.warning(response.message);
      }
    });
  }
}