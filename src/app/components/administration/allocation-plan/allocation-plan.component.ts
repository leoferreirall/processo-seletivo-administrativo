
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AtribuicaoService } from '@services/atribuicao.service';
import { BaseComponent } from '../../base.component';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
declare var $: any;

@Component({
  selector: 'app-allocation-plan',
  templateUrl: './allocation-plan.component.html',
  styleUrls: ['./allocation-plan.component.scss']
})
export class AllocationPlanComponent extends BaseComponent implements OnInit {
  @ViewChild('formPs') formPs: NgForm;

  data: any = [];
  listaFormaIngresso: any[] = [];
  listaPlanos: any[] = [];
  listaCursos: any[] = [];

  mask: string;

  table: any;
  masterSelected: boolean = false;

  atrib: any = {
    codColigada: null,
    nome: null,
    cpf: null,   
    codPsPlano: null,
    codFormaIngresso: null 
  };  

  constructor(private toastr: ToastrService,
    private AtribuicaoService: AtribuicaoService,
    private chRef: ChangeDetectorRef,
    private Router: Router,
    private NgxSpinnerService: NgxSpinnerService) {
    super();       
  }

  ngOnInit() {
    this.NgxSpinnerService.show();
    
    this.AtribuicaoService.ListarPlanosPrivados(2).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      this.listaPlanos = response.result;
    });
  }
   
  onChangePlano(plano: any) {
    this.atrib.codColigada = plano.codColigada;
    this.atrib.codTipoCurso = plano.codTipoCurso;
    this.atrib.codFilial = plano.codFilial;
    this.atrib.unidade = plano.unidade;
    this.atrib.categoria = plano.descricaoCategoriaPS;
    this.atrib.idCategoriaPs = plano.idCategoriaPs;
    this.atrib.idPerLet = plano.idPerLet;
    this.atrib.codPsPlano = plano.codPsPlano;
    this.atrib.descricaoTipoCurso = plano.descricaoTipoCurso;
    this.atrib.descricaoPerLet = plano.idPerLet + ' - ' + plano.descricaoPerLet;

    this.listaCursos = null;
    this.listaFormaIngresso = null;

    this.NgxSpinnerService.show();

    this.AtribuicaoService.GetFormaIngresso(this.atrib.codPsPlano).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);
        return;
      }
      
      this.listaFormaIngresso = response.result;
    });

    this.NgxSpinnerService.show();

    this.AtribuicaoService.GetCurso(this.atrib.codPsPlano).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);
        return;
      }

      this.listaCursos = response.result;
    });
  }
 
  onSubmitPesquisar(atrib) {
    if (!atrib.codPsPlano) {
      this.toastr.warning("Favor selecionar um plano");
    } else {
      this.pesquisar(atrib);
    }
  }

  pesquisar(atrib) {

    this.NgxSpinnerService.show();

    this.AtribuicaoService.GetAtribuicao(atrib).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      this.data = response.result;

      if (this.table) {
        this.table.clear()
          .destroy();
      }      

      this.chRef.detectChanges();

      this.table = $('table');

      this.table = this.table.DataTable(environment.tableOptions);
    });
    this.atrib.InscricaoChecked = [];
  }

  onSubmitAtribuirPlano(atrib) {

    if (atrib.InscricaoChecked.length <= 0) {
      this.toastr.warning("Favor selecionar ao menos uma inscrição.");
    } else {
      Swal.fire({
        title: '<strong style="color:#ff5c00">Confirmação</strong>',
        text: 'Deseja realmente atribuir o plano privado a essas inscrições?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#ff5c00'
      }).then((result) => {
          if (result.isConfirmed) {
            
            this.NgxSpinnerService.show();
        
            this.AtribuicaoService.Post(atrib).subscribe((response: any) => {
            this.NgxSpinnerService.hide();

            if (response.statusCode == 404) {
              this.toastr.warning(response.message);

              return;
            } else if (response.statusCode != 200) {
              this.toastr.error(response.message);

              return;
            }

            this.toastr.success(response.result, null, {
              disableTimeOut: true,
            });

            this.pesquisar(atrib);
          });
        }
      });  
    }    
  }

  onSubmitRemoverPlano(atrib) {

    if (atrib.InscricaoChecked.length <= 0) {
      this.toastr.warning("Favor selecionar ao menos uma inscrição.");
    } else {
      Swal.fire({
        title: '<strong style="color:#ff5c00">Confirmação</strong>',
        text: 'Deseja realmente remover o plano privado dessas inscrições?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#ff5c00'
      }).then((result) => {
          if (result.isConfirmed) {
            
            this.NgxSpinnerService.show();
        
            this.AtribuicaoService.Remove(atrib).subscribe((response: any) => {
            this.NgxSpinnerService.hide();

            if (response.statusCode == 404) {
              this.toastr.warning(response.message);

              return;
            } else if (response.statusCode != 200) {
              this.toastr.error(response.message);

              return;
            }

            this.toastr.success(response.result, null, {
              disableTimeOut: true,
            });

            this.pesquisar(atrib);
          });
        }
      });  
    }
  }

  onChangeSelect(event: any, lista: any, nomeListaSelecionada: any, coluna: any) {

    if (event.target.index == 0) {
      if (event.target.selected) {
        this.atrib[nomeListaSelecionada] = [0];

        this.atrib[nomeListaSelecionada] = this.atrib[nomeListaSelecionada].concat(lista.map(item => item[coluna]));
      } else {
        this.atrib[nomeListaSelecionada] = [];
      }
    } else {
      this.atrib[nomeListaSelecionada].remove(0);

      if (this.atrib[nomeListaSelecionada].length == lista.length) {
        this.atrib[nomeListaSelecionada] = [0];

        this.atrib[nomeListaSelecionada] = this.atrib[nomeListaSelecionada].concat(lista.map(item => item[coluna]));
      }
    }

    let listaSelecionada = this.atrib[nomeListaSelecionada];

    $("#" + event.target.parentElement.id + " option").each(function () {
      $(this).prop('selected', false);

      if (listaSelecionada.filter(item => {
        return item == $(this)[0].id;
      }).length > 0) {
        $(this).prop('selected', true);
      }
    });
  }  

  checkUncheckAll() {
    for (var i = 0; i < this.data.length; i++) {
      this.data[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.masterSelected = this.data.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemList();
  }

  getCheckedItemList(){
    this.atrib.InscricaoChecked = [];
    for (var i = 0; i < this.data.length; i++) {
      if(this.data[i].isSelected)
        this.atrib.InscricaoChecked.push(this.data[i].codPsInscricao);
    }
  }

  onChangeCurso(Cursos: any) {    
    this.atrib.cursos.remove(0);  
  }

  onView(plano) {
    if(plano != null){
      this.Router.navigate([]).then(result => {  window.open( `#/administrativo/campanha/planos/edit/${plano.codPsPlano}`, '_blank'); });
    }
  }

  cpfcnpjmask() {
    const value = this.atrib.cpf;
    if(value.length <= 14) {
      this.mask = '000.000.000-00'      
    }
  }
  
}

