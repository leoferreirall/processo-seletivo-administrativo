import { Component, OnInit, ViewChild, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PlanoService } from '@services/plano.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  
  data: any = [];
  plano: any = {};

  constructor(private Router: Router, 
    public PlanoService: PlanoService, 
    private chRef: ChangeDetectorRef,
    private toastr: ToastrService,
    private NgxSpinnerService: NgxSpinnerService
    ) {
  }
  
  ngOnInit() {
    this.NgxSpinnerService.show();
    
    this.PlanoService.ListarPlanos().subscribe((response: any) => {
      this.NgxSpinnerService.hide();
    
      if(response.statusCode == 404){
        this.toastr.warning(response.message);

        return;
      } else if(response.statusCode != 200){
        this.toastr.error(response.message);

        return;
      }
      
      this.data = response.result;

      this.chRef.detectChanges();

      const table: any = $('table');

      //$.fn.dataTable.ext.classes.sPageButton = '';

      table.DataTable(environment.tableOptions);
    });
  }

  deletarPlano(plano){
    /*this.PlanoService.apiPlanoIdDelete(plano.codPlano).subscribe((response: any) =>{
      if(response.code == 0){
        //this.toastr.success("Plano deletado com sucesso");
        
        this.Router.onSameUrlNavigation = 'reload';
        this.Router.navigate(['/plano']);
      } else{
        //this.toastr.error(response.message);
      }

      $('#modalDeletarPlano').modal('hide');
    });*/
  }

  reloadPage(){
  }

  openModalDeletarPlano(plano){
    this.plano = plano;

    $('#modalDeletarPlano').modal('show');
  }
}
