import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PlanoService } from '@services/plano.service';
import { CampanhaService } from '@services/campanha.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-offer-plan',
  templateUrl: './offer-plan.component.html',
  styleUrls: ['./offer-plan.component.scss']
})
export class OfferPlanComponent implements OnInit {
  @ViewChild('formOfertaPlano') formOfertaPlano: NgForm;

  listaPlanos: any[] = [];
  listaTipoCurso: any[] = [];
  listaUnidades: any[] = [];
  listaPeriodoLetivo: any[] = [];
  listaCursos: any[] = [];
  listaTurnos: any[] = [];
  listaEstados: any[] = [];
  listaCidades: any[] = [];
  listaPolos: any[] = [];
  listaFormaIngresso: any[] = [];
  listaSemestres: any[] = [];

  ofertaPlano: any = {
    codColigada: null,
    codTipoCurso: null,
    codFilial: null,
    unidade: null,
    categoria: null,
    idCategoriaPs: null,
    idPerLet: null,
    cursos: null,
    turnos: null,
    estados: null,
    cidades: null,
    polos: null,
    formasIngresso: null,
    semestres: null
  };

  constructor(private toastr: ToastrService,
    private CampanhaService: CampanhaService,
    private PlanoService: PlanoService,
    private NgxSpinnerService: NgxSpinnerService) {
  }

  ngOnInit() {
    this.NgxSpinnerService.show();

    this.PlanoService.ListarPlanos().subscribe((response: any) => {
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
    this.ofertaPlano.codColigada = plano.codColigada;
    this.ofertaPlano.codTipoCurso = plano.codTipoCurso;
    this.ofertaPlano.codFilial = plano.codFilial;
    this.ofertaPlano.unidade = plano.unidade;
    this.ofertaPlano.categoria = plano.descricaoCategoriaPS;
    this.ofertaPlano.idCategoriaPs = plano.idCategoriaPs;
    this.ofertaPlano.idPerLet = plano.idPerLet;
    this.ofertaPlano.codPsPlano = plano.codPsPlano;
    this.ofertaPlano.descricaoTipoCurso = plano.descricaoTipoCurso;
    this.ofertaPlano.descricaoPerLet = plano.idPerLet + ' - ' + plano.descricaoPerLet;
    //this.ofertaPlano.qtdParcelasContrato = plano.qtdParcelasPlano;

    this.ofertaPlano.dtInicio = plano.dtInicio.substring(0, 10);
    this.ofertaPlano.dtFim = plano.dtFim.substring(0, 10);

    this.ofertaPlano.cursos = [];
    this.ofertaPlano.turnos = [];
    this.ofertaPlano.estados = [];
    this.ofertaPlano.cidades = [];
    this.ofertaPlano.polos = [];
    this.ofertaPlano.formasIngresso = [];
    this.ofertaPlano.semestres = [];

    this.listaCursos = [];
    this.listaTurnos = [];
    this.listaEstados = [];
    this.listaCidades = [];
    this.listaPolos = [];
    this.listaFormaIngresso = [];
    this.listaSemestres = [];

    this.NgxSpinnerService.show();

    this.CampanhaService.GetCurso(plano.codColigada, plano.codTipoCurso, plano.codFilial, plano.idPerLet, plano.codPsPlano, plano.qtdParcelasPlano, plano.idCategoriaPs).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      this.listaCursos = response.result;
    });
  }

  onBlurCurso(ofertaPlano) {
    ofertaPlano.cursos.remove(0);

    this.ofertaPlano.turnos = [];
    this.ofertaPlano.estados = [];
    this.ofertaPlano.cidades = [];
    this.ofertaPlano.polos = [];
    this.ofertaPlano.formasIngresso = [];
    this.ofertaPlano.semestres = [];

    this.listaTurnos = [];
    this.listaFormaIngresso = [];
    this.listaSemestres = [];
    this.listaEstados = [];
    this.listaCidades = [];
    this.listaPolos = [];

    this.NgxSpinnerService.show();

    this.CampanhaService.GetTurno(ofertaPlano).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      this.listaTurnos = response.result;
    });
  }

  onBlurTurno(ofertaPlano) {
    ofertaPlano.turnos.remove(0);

    this.ofertaPlano.formasIngresso = [];
    this.ofertaPlano.semestres = [];
    this.ofertaPlano.estados = [];
    this.ofertaPlano.cidades = [];
    this.ofertaPlano.polos = [];

    this.listaFormaIngresso = [];
    this.listaSemestres = [];
    this.listaEstados = [];
    this.listaCidades = [];
    this.listaPolos = [];

    this.NgxSpinnerService.show();

    this.CampanhaService.GetFormaIngresso(ofertaPlano).subscribe((response: any) => {
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

  onBlurFormaIngresso(ofertaPlano) {
    ofertaPlano.formasIngresso.remove(0);

    this.ofertaPlano.semestres = [];
    this.ofertaPlano.estados = [];
    this.ofertaPlano.cidades = [];
    this.ofertaPlano.polos = [];

    this.listaSemestres = [];
    this.listaEstados = [];
    this.listaCidades = [];
    this.listaPolos = [];

    this.NgxSpinnerService.show();

    this.CampanhaService.GetSemestre(ofertaPlano).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      this.listaSemestres = response.result;
    });
  }

  onBlurSemestre(ofertaPlano) {
    ofertaPlano.semestres.remove(0);

    this.ofertaPlano.estados = [];
    this.ofertaPlano.cidades = [];
    this.ofertaPlano.polos = [];

    this.listaEstados = [];
    this.listaCidades = [];
    this.listaPolos = [];

    this.NgxSpinnerService.show();

    this.CampanhaService.GetEstado(ofertaPlano).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      this.listaEstados = response.result;
    });
  }

  onBlurEstado(ofertaPlano) {
    ofertaPlano.estados.remove(0);

    this.ofertaPlano.cidades = [];
    this.ofertaPlano.polos = [];

    this.listaCidades = [];
    this.listaPolos = [];

    this.NgxSpinnerService.show();

    this.CampanhaService.GetCidade(ofertaPlano).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      this.listaCidades = response.result;
    });
  }

  onBlurCidade(ofertaPlano) {
    ofertaPlano.cidades.remove(0);

    this.ofertaPlano.polos = [];

    this.listaPolos = [];

    this.NgxSpinnerService.show();

    this.CampanhaService.GetPolo(ofertaPlano).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      this.listaPolos = response.result;
    });
  }

  onBlurPolo(ofertaPlano) {
    ofertaPlano.polos.remove(0);
  }

  onSubmitFormOfertaPlano(ofertaPlano: any) {
    if (!ofertaPlano.codTipoCurso) {
      this.toastr.warning("Favor selecionar o tipo de curso");
    } else if (!ofertaPlano.codFilial) {
      this.toastr.warning("Favor selecionar a unidade");
    } else if (!ofertaPlano.idPerLet) {
      this.toastr.warning("Favor selecionar o período letivo");
    } else if (ofertaPlano.cursos.length == 0) {
      this.toastr.warning("Favor selecionar ao menos um curso");
    } else {
      Swal.fire({
        title: '<strong style="color:#ff5c00">Confirmação</strong>',
        text: 'Deseja realmente vincular essas ofertas ao plano?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#ff5c00'
      }).then((result) => {
        if (result.isConfirmed) {
          this.NgxSpinnerService.show();
          
          this.CampanhaService.Salvar(ofertaPlano).subscribe((response: any) => {
            this.NgxSpinnerService.hide();

            if (response.statusCode == 200) {
              this.toastr.success("Ofertas vinculadas ao plano com sucesso!", null, {
                disableTimeOut: true,
              });
            } else {
              this.toastr.error(response.message, null, {
                disableTimeOut: true,
              });
            }
          });
        }
      });
    }
  }

  onChangeSelect(event: any, lista: any, nomeListaSelecionada: any, coluna: any) {
    if (event.target.index == 0) {
      if (event.target.selected) {
        this.ofertaPlano[nomeListaSelecionada] = [0];

        this.ofertaPlano[nomeListaSelecionada] = this.ofertaPlano[nomeListaSelecionada].concat(lista.map(item => item[coluna]));
      } else {
        this.ofertaPlano[nomeListaSelecionada] = [];
      }
    } else {
      this.ofertaPlano[nomeListaSelecionada].remove(0);

      if (this.ofertaPlano[nomeListaSelecionada].length == lista.length) {
        this.ofertaPlano[nomeListaSelecionada] = [0];

        this.ofertaPlano[nomeListaSelecionada] = this.ofertaPlano[nomeListaSelecionada].concat(lista.map(item => item[coluna]));
      }
    }

    let listaSelecionada = this.ofertaPlano[nomeListaSelecionada];

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