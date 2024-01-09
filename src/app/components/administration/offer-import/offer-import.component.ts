import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OfertaService } from '@services/oferta.service';
import { BaseComponent } from '../../base.component';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';
import { IntegracaoService } from '@services/integracao.service';

declare var $: any;

@Component({
  selector: 'app-offer-import',
  templateUrl: './offer-import.component.html',
  styleUrls: ['./offer-import.component.scss']
})
export class OfferImportComponent extends BaseComponent implements OnInit {
  @ViewChild('formOferta') formOferta: NgForm;

  listaTipoCurso: any[] = [];
  listaUnidades: any[] = [];
  listaCategorias: any[] = [];
  listaPeriodoLetivo: any[] = [];
  listaFormaIngresso: any[] = [];
  listaFluxos: any[] = [];

  oferta: any = {
    codColigada: null,
    codTipoCurso: null,
    codFilial: null,
    idCategoriaPs: null,
    idPerLet: null
  };

  constructor(private toastr: ToastrService,
    private OfertaService: OfertaService,
    private IntegracaoService: IntegracaoService,
    private NgxSpinnerService: NgxSpinnerService) {
    super();
  }

  ngOnInit() {
    this.NgxSpinnerService.show();

    this.OfertaService.GetTipoCurso().subscribe((response: any) => {
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

    this.IntegracaoService.getListaFluxos().subscribe((response: any) => {
      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      this.listaFluxos = response.result;
    });
  }

  onChangeTipoCurso(codColigada: any, codTipoCurso: any) {
    this.oferta.codColigada = codColigada;
    this.oferta.codTipoCurso = codTipoCurso;

    $("#codFilial").val("");

    this.oferta.codFilial = null;
    this.oferta.idCategoriaPs = null;
    this.oferta.idPerLet = null;
    this.oferta.idPs = null;

    this.listaUnidades = [];
    this.listaCategorias = [];
    this.listaPeriodoLetivo = [];
    this.listaFormaIngresso = [];

    this.NgxSpinnerService.show();

    this.OfertaService.GetUnidade(codColigada, codTipoCurso).subscribe((response: any) => {
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
    $("#idCategoriaPs").val("");

    this.oferta.idCategoriaPs = null;
    this.oferta.idPerLet = null;
    this.oferta.idPs = null;

    this.listaCategorias = [];
    this.listaPeriodoLetivo = [];
    this.listaFormaIngresso = [];

    this.NgxSpinnerService.show();

    this.OfertaService.GetCategoria(codColigada, codTipoCurso, codFilial).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      this.listaCategorias = response.result;
    });
  }

  onChangeCategoria(codColigada: any, codTipoCurso: any, codFilial: any, idCategoriaPs: any) {
    $("#idPerLet").val("");

    this.oferta.idPerLet = null;
    this.oferta.idPs = null;

    this.listaPeriodoLetivo = [];
    this.listaFormaIngresso = [];

    this.NgxSpinnerService.show();

    this.OfertaService.GetPeriodoLetivo(codColigada, codTipoCurso, codFilial, idCategoriaPs).subscribe((response: any) => {
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

  onChangePeriodoLetivo(codColigada: any, codTipoCurso: any, codFilial: any, idCategoriaPs: any, idPerLet: any) {
    $("#idPs").val("");

    this.oferta.idPs = null;

    this.listaFormaIngresso = [];

    this.NgxSpinnerService.show();

    this.OfertaService.GetFormaIngresso(codColigada, codTipoCurso, codFilial, idCategoriaPs, idPerLet).subscribe((response: any) => {
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

  onSubmitFormOferta(oferta: any) {
    if (!oferta.codTipoCurso) {
      this.toastr.warning("Favor selecionar o tipo de curso");
    } else if (!oferta.codFilial) {
      this.toastr.warning("Favor selecionar a unidade");
    } else if (!oferta.idCategoriaPs) {
        this.toastr.warning("Favor selecionar a forma de ingresso");      
    } else if (!oferta.idPerLet) {
      this.toastr.warning("Favor selecionar o período letivo");
    } else if (!oferta.idPs) {
      this.toastr.warning("Favor selecionar a forma de ingresso");
    }
     else if (!oferta.codFluxo) {
      this.toastr.warning("Favor selecionar o fluxo de integração");
    } else {
      Swal.fire({
        title: '<strong style="color:#ff5c00">Confirmação</strong>',
        text: 'Deseja realmente importar essas ofertas?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#ff5c00'
      }).then((result) => {
        if (result.isConfirmed) {
          this.NgxSpinnerService.show();

          this.OfertaService.Importar(oferta).subscribe((response: any) => {
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

            this.toastr.success(response.result, null, {
              disableTimeOut: true,
            });
          });
        }
      });
    }
  }
}