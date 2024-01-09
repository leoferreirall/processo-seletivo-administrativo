import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PsService } from '@services/ps.service';
import { BaseComponent } from '../../base.component';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-processo-seletivo',
  templateUrl: './processo-seletivo.component.html',
  styleUrls: ['./processo-seletivo.component.scss']
})
export class ProcessoSeletivoComponent extends BaseComponent implements OnInit {
  @ViewChild('formPs') formPs: NgForm;

  data: any = [];
  listaTipoCurso: any[] = [];
  listaUnidades: any[] = [];
  listaCategoria: any[] = [];
  listaPeriodoLetivo: any[] = [];
  listaFormaIngresso: any[] = [];
  listaTurno: any[] = [];
  listaAreaInteresse: any[] = [];

  table: any;
  masterSelected: boolean = false;
  DtIni: null;  
  DtFim: null; 
  HrIni: null;
  HrFim: null;

  ps: any = {
    codColigada: null,
    codTipoCurso: null,
    codFilial: null,
    idCategoriaPs: null,
    idPerLet: null,
    idPs: null,
    AreaInteresse: null,
    AreaInteresseChecked: null,
    dtIniInscricao: null,
    dtFimInscricao: null,
    hrIniInscricao: null,
    hrFimInscricao: null,
    status: 0
  };  

  constructor(private toastr: ToastrService,
    private PsService: PsService,
    private chRef: ChangeDetectorRef,
    private NgxSpinnerService: NgxSpinnerService) {
    super();       
  }

  ngOnInit() {
    this.NgxSpinnerService.show();

    this.PsService.GetFiltroTipoCurso().subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      this.listaTipoCurso = response.result;
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
    this.ps.AreaInteresseChecked = [];
    for (var i = 0; i < this.data.length; i++) {
      if(this.data[i].isSelected)
        this.ps.AreaInteresseChecked.push(this.data[i].idAreaInteresse);
    }
  }

  onChangeTipoCurso(codTipoCurso: any, codColigada: any) {

    this.listaUnidades = [];
    this.listaCategoria = [];
    this.listaPeriodoLetivo = [];
    this.listaFormaIngresso = [];
    this.listaTurno = [];
    this.listaAreaInteresse = [];
    this.ps.AreaInteresse = [];

    this.ps.codTipoCurso = codTipoCurso;
    this.ps.codColigada = codColigada;

    $("#codFilial").val("");
    this.ps.codFilial = null;
    this.listaUnidades = [];

    this.NgxSpinnerService.show();

    this.PsService.GetFiltroUnidade(codTipoCurso).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }
      
      this.listaUnidades = response.result;
    });
  }

  onChangeUnidade(codFilial: any, codTipoCurso: any) {

    this.listaCategoria = [];
    this.listaPeriodoLetivo = [];
    this.listaFormaIngresso = [];
    this.listaTurno = [];
    this.listaAreaInteresse = [];
    this.ps.AreaInteresse = [];

    $("#idCategoriaPs").val("");
    this.ps.idCategoriaPs = null;
    this.listaCategoria = [];

    this.NgxSpinnerService.show();

    this.PsService.GetFiltroCategoriaPs(codFilial, codTipoCurso).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }
      
      this.listaCategoria = response.result;
    });
  }

  onChangeCategoria(codFilial: any, codTipoCurso: any, idCategoriaPs: any) {

    this.listaPeriodoLetivo = [];
    this.listaFormaIngresso = [];
    this.listaTurno = [];
    this.listaAreaInteresse = [];
    this.ps.AreaInteresse = [];

    $("#idPerLet").val("");
    this.ps.idPerLet = null;
    this.listaPeriodoLetivo = [];

    this.NgxSpinnerService.show();

    this.PsService.GetFiltroPeriodoLetivo(codFilial, codTipoCurso, idCategoriaPs).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }
      
      this.listaPeriodoLetivo = response.result;
    });
  }

  onChangePeriodoLetivo(codTipoCurso: any, codFilial: any, idCategoriaPs: any, idPerLet: any) {

    this.listaFormaIngresso = [];
    this.listaTurno = [];
    this.listaAreaInteresse = [];
    this.ps.AreaInteresse = [];

    $("#idPs").val("");
    this.ps.idPs = null;
    this.listaFormaIngresso = [];

    this.NgxSpinnerService.show();

    this.PsService.GetFiltroFormaIngresso(codTipoCurso, codFilial, idCategoriaPs, idPerLet).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }
      
      this.listaFormaIngresso = response.result;
    });    
  }

  onChangeFormaIngresso(codFilial: any, codTipoCurso: any, idPerLet: any, idCategoriaPs: any) {
  
    this.listaTurno = [];
    this.listaAreaInteresse = [];
    this.ps.AreaInteresse = [];

    $("#codTurno").val("");
    this.ps.codTurno = null;

    this.NgxSpinnerService.show();

    this.PsService.GetFiltroTurno(codFilial, codTipoCurso, idPerLet, idCategoriaPs).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }
      
      this.listaTurno = response.result;
    });    
  }

  onChangeTurno(idPs: any, codTurno: any) {
    
    this.listaAreaInteresse = [];
    this.ps.AreaInteresse = [];

    this.NgxSpinnerService.show();

    this.PsService.GetFiltroAreaInteresse(idPs, codTurno).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      this.listaAreaInteresse = response.result;
    });
  }

  onChangeAreaInteresse(AreaInteresse: any) {    
    this.ps.AreaInteresse.remove(0);  
  }

  onChangeSelect(event: any, lista: any, nomeListaSelecionada: any, coluna: any) {
    
    if (event.target.index == 0) {
      if (event.target.selected) {
        this.ps[nomeListaSelecionada] = [0];

        this.ps[nomeListaSelecionada] = this.ps[nomeListaSelecionada].concat(lista.map(item => item[coluna]));
      } else {
        this.ps[nomeListaSelecionada] = [];
      }
    } else {
      this.ps[nomeListaSelecionada].remove(0);

      if (this.ps[nomeListaSelecionada].length == lista.length) {
        this.ps[nomeListaSelecionada] = [0];

        this.ps[nomeListaSelecionada] = this.ps[nomeListaSelecionada].concat(lista.map(item => item[coluna]));
      }
    }

    let listaSelecionada = this.ps[nomeListaSelecionada];

    $("#" + event.target.parentElement.id + " option").each(function () {
      $(this).prop('selected', false);

      if (listaSelecionada.filter(item => {
        return item == $(this)[0].id;
      }).length > 0) {
        $(this).prop('selected', true);
      }
    });
  }  

  limparDataIni(){
    $("#dtIniInscricao").val("");
    $("#hrIniInscricao").val("");
    this.ps.dtIniInscricao = null;    
    this.ps.hrIniInscricao = null;

  }

  limparDataFim(){
    $("#dtFimInscricao").val("");
    $("#hrFimInscricaO").val("");
    this.ps.dtFimInscricao = null;
    this.ps.hrFimInscricao = null;
  }

  onSubmitPesquisar(ps) {
    if (!ps.codTipoCurso) {
      this.toastr.warning("Favor selecionar o tipo de curso");
    } else if (!ps.codFilial) {
      this.toastr.warning("Favor selecionar a unidade");
    } else if (!ps.idCategoriaPs) {
      this.toastr.warning("Favor selecionar a categoria");
    } else if (!ps.idPerLet) {
      this.toastr.warning("Favor selecionar a periodo letivo");
    } else if (!ps.idPs) {
      this.toastr.warning("Favor selecionar a forma de ingresso");
    } else if (!ps.codTurno) {
      this.toastr.warning("Favor selecionar o turno");
    } else if (ps.AreaInteresse.length == 0) {
      this.toastr.warning("Favor selecionar uma area de interesse");
    } else {
      this.pesquisar(ps);
    }
  }

  pesquisar(ps) {

    this.NgxSpinnerService.show();

    this.PsService.GetFiltroAltProcessoSeletivo(ps).subscribe((response: any) => {
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
    this.ps.AreaInteresseChecked = [];
  }

  onSubmitFormAlterar(ps) {
    // if (!ps.dtIniInscricao) {
    //   this.toastr.warning("Favor selecionar uma data Inicial");
    // } else if (!ps.dtFimInscricao) {
    //   this.toastr.warning("Favor selecionar uma data Final");
    // } else 

    if(Date.parse(ps.dtFimInscricao) < Date.parse(ps.dtIniInscricao)){
      var message = "Data de início nao pode ser maior que Data de Fim "
      this.toastr.warning(message);

      return;
    }

    if (Date.parse(ps.dtIniInscricao) == Date.parse(ps.dtFimInscricao)){
      if (ps.hrFimInscricao < ps.hrIniInscricao){
        var message = "Data de início nao pode ser maior que Data de Fim "
        this.toastr.warning(message);
        ps.hrIniInscricao = null;
        ps.hrFimInscricao = null;
        
        return;
      }
    }

    if (ps.hrIniInscricao != null){
      ps.dtIniInscricao = ps.dtIniInscricao + ' ' + ps.hrIniInscricao;
    }
    else {
      var message = "Insira uma Hora de início válida"
      this.toastr.warning(message);
      ps.dtIniInscricao = null;
      return;
    }

    if (ps.hrFimInscricao != null){
      ps.dtFimInscricao = ps.dtFimInscricao + ' ' + ps.hrFimInscricao;
    }
    else {
      var message = "Insira uma Hora de fim válida"
      this.toastr.warning(message);
      ps.dtFimInscricao = null;
      return;
    }

    if (!ps.AreaInteresseChecked) {
      this.toastr.warning("Favor selecionar ao menos uma Área de Interesse");
    } else {
      Swal.fire({
        title: '<strong style="color:#ff5c00">Confirmação</strong>',
        text: 'Deseja realmente alterar essa(s) area(s) de interesse?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#ff5c00'
      }).then((result) => {
        if (result.isConfirmed) {
              this.NgxSpinnerService.show();
    
    this.PsService.Put(ps).subscribe((response: any) => {  //método que envia os dados ao clicar no Alterar. 
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

      ps.dtIniInscricao = null;
      ps.dtFimInscricao = null;
      ps.hrIniInscricao = null;
      ps.hrFimInscricao = null;
    });
  }
});
}
}
}
