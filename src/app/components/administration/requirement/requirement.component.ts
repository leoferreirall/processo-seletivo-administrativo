import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PsService } from '@services/ps.service';
import { BaseComponent } from '../../base.component';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.scss']
})
export class RequirementComponent extends BaseComponent implements OnInit {
  @ViewChild('formPs') formPs: NgForm;

  listaTipoCurso: any[] = [];
  listaUnidades: any[] = [];
  listaCategoria: any[] = [];
  listaPeriodoLetivo: any[] = [];
  listaFormaIngresso: any[] = [];
  listaRequisito: any[] = [];
  listaReqFormaIngresso: any[] = [];

  model: any = {
    codColigada: null,
    codTipoCurso: null,
    codFilial: null,
    idCategoriaPs: null,
    idPerLet: null,
    idPs: null,
    codPsFormaIngressoDominio: null,
    validaStatusChamada: false,
    psReqFormaIngresso: []
  };

  requisito: any = {};

  constructor(private toastr: ToastrService,
    private PsService: PsService,
    private NgxSpinnerService: NgxSpinnerService) {
    super();
  }

  ngOnInit() {
    this.NgxSpinnerService.show();

    this.PsService.GetFiltroTipoCurso().subscribe((response: any) => {
      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        this.NgxSpinnerService.hide();

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        this.NgxSpinnerService.hide();

        return;
      }

      this.listaTipoCurso = response.result;

      this.listaRequisito = [];
      this.model.psReqFormaIngresso = [];

      this.PsService.ListarTipoRequisitos().subscribe((response: any) => {
        this.NgxSpinnerService.hide();

        if (response.statusCode == 404) {
          this.toastr.warning(response.message);

          return;
        } else if (response.statusCode != 200) {
          this.toastr.error(response.message);

          return;
        }

        this.listaRequisito = response.result;
      });
    });
  }

  onChangeTipoCurso(codTipoCurso: any, codColigada: any) {
    this.listaUnidades = [];
    this.listaCategoria = [];
    this.listaPeriodoLetivo = [];
    this.listaFormaIngresso = [];
    this.model.psReqFormaIngresso = [];

    this.model.codTipoCurso = codTipoCurso;
    this.model.codColigada = codColigada;
    this.model.validaStatusChamada = false;

    $("#codFilial").val("");
    this.model.codFilial = null;
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
    this.model.psReqFormaIngresso = [];

    this.model.validaStatusChamada = false;

    $("#idCategoriaPs").val("");
    this.model.idCategoriaPs = null;
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
    this.model.psReqFormaIngresso = [];

    this.model.validaStatusChamada = false;

    $("#idPerLet").val("");
    this.model.idPerLet = null;
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
    this.model.psReqFormaIngresso = [];

    this.model.validaStatusChamada = false;

    $("#idPs").val("");
    this.model.idPs = null;
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

  onChangeFormaIngresso(codTipoCurso: any, idCategoriaPs: any, idPs: any, codPsFormaIngressoDominio: any) {
    this.model.idPs = idPs;
    this.model.codPsFormaIngressoDominio = codPsFormaIngressoDominio;
    this.model.validaStatusChamada = false;

    this.NgxSpinnerService.show();

    this.PsService.GetFormaIngresso(codTipoCurso, idCategoriaPs, idPs, codPsFormaIngressoDominio).subscribe((response: any) => {
      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        this.NgxSpinnerService.hide();

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        this.NgxSpinnerService.hide();

        return;
      } else if (response.result) {
        this.model.validaStatusChamada = response.result.validaStatusChamada;

        this.PsService.GetReqFormaIngresso(codTipoCurso, idCategoriaPs, idPs, codPsFormaIngressoDominio).subscribe((response: any) => {
          this.NgxSpinnerService.hide();

          if (response.statusCode == 404) {
            this.toastr.warning(response.message);

            return;
          } else if (response.statusCode != 200) {
            this.toastr.error(response.message);

            return;
          }

          this.model.psReqFormaIngresso = response.result;
        });
      } else {
        this.NgxSpinnerService.hide();
      }
    });
  }

  onChangeRequisito(psReqFormaIngresso: any) {
    this.model.psReqFormaIngresso.remove(0);
  }

  addReqFormaIngresso() {
    if (!this.requisito.ordem) {
      this.toastr.warning("Favor informar a ordem habilitação");

      return;
    }
    else if (this.model.psReqFormaIngresso.filter(item => {
      return item.ordem == this.requisito.ordem;
    }).length > 0) {
      this.toastr.warning("Ordem habilitação já cadastrada");

      return;
    }
    else if (!this.requisito.dtInicio) {
      this.toastr.warning("Favor informar a data início");

      return;
    }
    else if (!this.requisito.hrInicio) {
      this.toastr.warning("Favor informar a hora início");

      return;
    }
    else if (!this.requisito.dtFim) {
      this.toastr.warning("Favor informar a data fim");

      return;
    }
    else if (!this.requisito.hrFim) {
      this.toastr.warning("Favor informar a hora fim");

      return;
    }

    var requisito = JSON.parse(JSON.stringify(this.listaRequisito.find(x => x.codPsTipoRequisito == this.requisito.codPsTipoRequisito)));

    requisito.requerAnalise = this.requisito.requerAnalise;
    requisito.requerAceite = this.requisito.requerAceite;
    requisito.ordem = this.requisito.ordem;
    requisito.dtInicio = this.requisito.dtInicio + 'T' + this.requisito.hrInicio + ':00';
    requisito.dtFim = this.requisito.dtFim + 'T' + this.requisito.hrFim + ':00';

    this.model.psReqFormaIngresso.push(requisito);

    this.requisito = {};

    this.ordenarRequisitos(this.model.psReqFormaIngresso);
  }

  removerReqFormaIngresso(model: any) {
    this.model.psReqFormaIngresso.remove(model);

    this.ordenarRequisitos(this.model.psReqFormaIngresso);
  }

  ordenarRequisitos(psReqFormaIngresso) {
    psReqFormaIngresso.forEach((requisito, i) => {
      requisito.ordemExibicao = i + 1;
    });
  }

  onSubmitFormPs(model: any) {
    if (!model.codTipoCurso) {
      this.toastr.warning("Favor selecionar o tipo de curso");
    } else if (!model.codFilial) {
      this.toastr.warning("Favor selecionar a unidade");
    } else if (!model.idCategoriaPs) {
      this.toastr.warning("Favor selecionar a categoria");
    } else if (!model.idPerLet) {
      this.toastr.warning("Favor selecionar a periodo letivo");
    } else if (!model.idPs) {
      this.toastr.warning("Favor selecionar a forma de ingresso");
    } else if (model.psReqFormaIngresso.length == 0) {
      this.toastr.warning("Favor selecionar ao menos um requisito");
    } else {
      Swal.fire({
        title: '<strong style="color:#ff5c00">Confirmação</strong>',
        text: 'Deseja realmente vincular essa forma de ingresso a esse(s) requisito(s)?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#ff5c00'
      }).then((result) => {
        if (result.isConfirmed) {
          this.NgxSpinnerService.show();

          this.PsService.CadastrarFormaingresso(model).subscribe((response: any) => {
            this.NgxSpinnerService.hide();

            if (response.statusCode == 404) {
              this.toastr.warning(response.message);

              return;
            } else if (response.statusCode != 200) {
              this.toastr.error(response.message);

              return;
            }

            this.toastr.success(response.result);
          });
        }
      });
    }
  }
}
