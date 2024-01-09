import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { BolsaService } from '@services/bolsa.service';

declare var $: any;

@Component({
  selector: 'app-scholarship-import',
  templateUrl: './scholarship-import.component.html',
  styleUrls: ['./scholarship-import.component.scss']
})
export class ScholarshipImportComponent implements OnInit {
  @ViewChild('formBolsa') formBolsa: NgForm;

  listaTipoCurso: any[] = [];
  listaUnidades: any[] = [];
  listaPeriodoLetivo: any[] = [];
  listaBolsas: any[] = [];
  listaTipoBolsa: any[] = [];
  listaTipoDesconto: any[] = [];
  listaFormaIngresso: any[] = [];

  bolsa: any = {
    codColigada: null,
    codTipoCurso: null,
    codFilial: null,
    idPerLet: null,
    codPsTipoBolsa: null,
    codPsTipoDesc: null,
    bolsas: null
  };

  constructor(private http: HttpClient,
    private toastr: ToastrService,
    private BolsaService: BolsaService,
    private NgxSpinnerService: NgxSpinnerService) {
  }

  ngOnInit() {
    this.NgxSpinnerService.show();

    this.BolsaService.GetTipoCurso().subscribe((response: any) => {
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

  onChangeTipoCurso(codColigada: any, codTipoCurso: any) {
    this.bolsa.codColigada = codColigada;
    this.bolsa.codTipoCurso = codTipoCurso;

    $("#codFilial").val("");

    this.bolsa.codFilial = null;
    this.bolsa.idPerLet = null;
    this.bolsa.codPsTipoBolsa = null;
    this.bolsa.codPsTipoDesc = null;
    this.bolsa.bolsas = [];

    this.listaUnidades = [];
    this.listaPeriodoLetivo = [];
    this.listaTipoBolsa = [];
    this.listaTipoDesconto = [];
    this.listaBolsas = [];
    this.listaFormaIngresso = [];

    this.NgxSpinnerService.show();

    this.BolsaService.GetUnidade(codColigada, codTipoCurso).subscribe((response: any) => {
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

  onChangeUnidade(codColigada: any, codTipoCurso: any, codFilial: any) {
    $("#idPerLet").val("");

    this.bolsa.idPerLet = null;
    this.bolsa.codPsTipoBolsa = null;
    this.bolsa.codPsTipoDesc = null;
    this.bolsa.bolsas = [];

    this.listaPeriodoLetivo = [];
    this.listaTipoBolsa = [];
    this.listaTipoDesconto = [];
    this.listaBolsas = [];
    this.listaFormaIngresso = [];

    this.NgxSpinnerService.show();

    this.BolsaService.GetPeriodoLetivo(codColigada, codTipoCurso, codFilial).subscribe((response: any) => {
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

  onChangePeriodoLetivo(codColigada: any, codTipoCurso: any, idPerLet: any) {
    this.bolsa.codPsTipoBolsa = null;
    this.bolsa.codPsTipoDesc = null;
    this.bolsa.bolsas = [];

    this.GetDadosBolsas(codColigada, codTipoCurso, idPerLet);
  }

  GetDadosBolsas(codColigada: any, codTipoCurso: any, idPerLet: any){
    this.listaTipoBolsa = [];
    this.listaTipoDesconto = [];
    this.listaBolsas = [];
    this.listaFormaIngresso = [];

    this.NgxSpinnerService.show();

    this.BolsaService.GetBolsa(codColigada, codTipoCurso, idPerLet).subscribe((response: any) => {
      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        this.NgxSpinnerService.hide();

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        this.NgxSpinnerService.hide();

        return;
      }

      this.listaBolsas = response.result;

      this.BolsaService.GetTipoBolsa().subscribe((response: any) => {
        if (response.statusCode == 404) {
          this.toastr.warning(response.message);

          this.NgxSpinnerService.hide();

          return;
        } else if (response.statusCode != 200) {
          this.toastr.error(response.message);

          this.NgxSpinnerService.hide();

          return;
        }

        this.listaTipoBolsa = response.result;

        this.BolsaService.GetTipoDesconto().subscribe((response: any) => {
          if (response.statusCode == 404) {
            this.toastr.warning(response.message);

            this.NgxSpinnerService.hide();

            return;
          } else if (response.statusCode != 200) {
            this.toastr.error(response.message);

            this.NgxSpinnerService.hide();

            return;
          }

          this.listaTipoDesconto = response.result;

          this.BolsaService.GetFormaIngresso(codColigada, codTipoCurso, idPerLet).subscribe((response: any) => {
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
        });
      });
    });
  }

  onSubmitFormBolsa(bolsa) {
    if (!bolsa.codTipoCurso) {
      this.toastr.warning("Favor selecionar o tipo de curso");
    } else if (!bolsa.codFilial) {
      this.toastr.warning("Favor selecionar a unidade");
    } else if (!bolsa.idPerLet) {
      this.toastr.warning("Favor selecionar o período letivo");
    } else if (bolsa.bolsas.length == 0) {
      this.toastr.warning("Favor selecionar ao menos uma bolsa");
    }
    else if (!bolsa.codPsTipoDesc) {
      this.toastr.warning("Favor selecionar o tipo de desconto");
    }
    else if (!bolsa.codPsTipoBolsa) {
      this.toastr.warning("Favor selecionar o tipo de bolsa");
    }
    else if (bolsa.codPsTipoBolsa == 3 && !bolsa.idPs) {
      this.toastr.warning("Favor selecionar a forma de ingresso");
    } else {
      if(bolsa.codPsTipoBolsa != 3){
        bolsa.idPs = null;
      }

      this.NgxSpinnerService.show();
      
      this.BolsaService.Importar(bolsa).subscribe((response: any) => {
        this.NgxSpinnerService.hide();

        if (response.statusCode == 404) {
          this.toastr.warning(response.message, null, {
            disableTimeOut: true,
          });

          return;
        } else if (response.statusCode != 200) {
          this.toastr.error(response.message, null, {
            disableTimeOut: true,
          });

          return;
        }

        this.GetDadosBolsas(bolsa.codColigada, bolsa.codTipoCurso, bolsa.idPerLet);

        this.toastr.success(response.result, null, {
          disableTimeOut: true,
        });
      });
    }
  }

  onChangeSelect(event: any, lista: any, nomeListaSelecionada: any, coluna: any) {
    if (event.target.index == 0) {
      if (event.target.selected) {
        this.bolsa[nomeListaSelecionada] = [0];

        this.bolsa[nomeListaSelecionada] = this.bolsa[nomeListaSelecionada].concat(lista.map(item => item[coluna]));
      } else {
        this.bolsa[nomeListaSelecionada] = [];
      }
    } else {
      this.bolsa[nomeListaSelecionada].remove(0);

      if (this.bolsa[nomeListaSelecionada].length == lista.length) {
        this.bolsa[nomeListaSelecionada] = [0];

        this.bolsa[nomeListaSelecionada] = this.bolsa[nomeListaSelecionada].concat(lista.map(item => item[coluna]));
      }
    }

    let listaSelecionada = this.bolsa[nomeListaSelecionada];

    $("#" + event.target.parentElement.id + " option").each(function () {
      $(this).prop('selected', false);

      if (listaSelecionada.filter(item => {
        return item == $(this)[0].id;
      }).length > 0) {
        $(this).prop('selected', true);
      }
    });
  }
}