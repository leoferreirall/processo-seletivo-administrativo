import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IntegracaoService } from '@services/integracao.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  inscricoes: any = [];
  details: [];

  nomeCandidato: null;
  cpf: null;
  curso: null;
  formaIngresso: null;
  turno: null;
  dataInscricao: null;

  constructor(private IntegracaoService: IntegracaoService,
    private chRef: ChangeDetectorRef,
    private toastr: ToastrService,
    private NgxSpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.NgxSpinnerService.show();

    this.IntegracaoService.getListaInscricao().subscribe(response => {
      this.NgxSpinnerService.hide();

      if(response.statusCode == 404){
        this.toastr.warning(response.message);

        return;
      } else if(response.statusCode != 200){
        this.toastr.error(response.message);

        return;
      }
      this.inscricoes = response.result;

      this.chRef.detectChanges();

      const table: any = $('table');

      var options: any = environment.tableOptions;

      options.order = [[ 2, 'asc' ],[0, "desc"]];

      table.DataTable(options);
    });
  }
}
