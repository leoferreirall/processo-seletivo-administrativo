import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { PlanoService } from '@services/plano.service';
import { OfertaService } from '@services/oferta.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-plan-create',
  templateUrl: './plan-create.component.html',
  styleUrls: ['./plan-create.component.scss']
})
export class PlanCreateComponent implements OnInit {
  @ViewChild('formPlano') formPlano: NgForm;

  id: number;

  listaTipoCurso: any[] = [];
  listaUnidades: any[] = [];
  listaPeriodoLetivo: any[] = [];
  listaBolsas: any[] = [];
  listaServicos: any[] = [];
  listaConvenios: any[] = [];
  listaCategorias: any[] = [];

  plano: any = {
    codColigada: null,
    codTipoCurso: null,
    codFilial: null,
    idCategoriaPs: null,
    idPerLet: null,
    nome: null,
    status: true,
    parcelaLan: null,
    dtInicio: new Date().toISOString().substring(0, 10),
    dtFim: new Date().toISOString().substring(0, 10),
    hrInicio: '00:00',
    hrFim: '23:59',
    parcelas: [],
    bolsas: [],
    tipoCurso: {},
    codPsTipoPlano: 1
  };

  parcela: any = {
    parcela: null,
    codServico: null,
    servico: null,
    codBanco: null,
    banco: null,
    codCaixa: null,
    caixa: null,
    gerarLancamento: null,
    permiteConvenio: null,
    geraLanIntegracao: null,
    bolsas: null,
    valor: null,
    tipoDesconto: null,
    desconto: null
  };

  bolsa: any = {
    parcela: null,
    codServico: null,
    servico: null,
    codBanco: null,
    banco: null,
    codCaixa: null,
    caixa: null,
    gerarLancamento: null,
    codBolsa: null,
    valor: null,
    codDesconto: null,
    desconto: null
  };

  constructor(private http: HttpClient,
    private toastr: ToastrService,
    private PlanoService: PlanoService,
    private OfertaService: OfertaService,
    private Router: Router,
    private NgxSpinnerService: NgxSpinnerService,
    private ActivatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = Number(this.ActivatedRoute.snapshot.paramMap.get("id"));

    this.NgxSpinnerService.show();

    this.PlanoService.GetTipoCurso().subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        this.id = null;

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        this.id = null;

        return;
      }

      this.listaTipoCurso = response.result;
    });

    $(".select2").select2({
      tags: true,
      tokenSeparators: [',', ' '] // note: doesn't work for these! hitting comma or space will reorder tags
    });

    $(".select2").on("select2:select", function (evt) {
      var element = evt.params.data.element;
      var $element = $(element);
      $element.detach();
      $(this).append($element);
      $(this).trigger("change");
    });
  }

  onChangeTipoCurso(codColigada: any, codTipoCurso: any) {
    this.plano.codColigada = codColigada;
    this.plano.codTipoCurso = codTipoCurso;

    this.listaUnidades = [];
    this.listaCategorias = [];
    this.listaPeriodoLetivo = [];
    this.listaBolsas = [];
    this.listaServicos = [];
    this.listaConvenios = [];

    $("#codFilial").val("");

    this.plano.codFilial = null;
    this.plano.idPerLet = null;

    this.parcela = {};

    this.plano.parcelas = [];

    $("#bolsas").val('').trigger('change');

    this.NgxSpinnerService.show();

    this.PlanoService.GetUnidade(codColigada, codTipoCurso).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        this.NgxSpinnerService.hide('completo');

        this.id = null;

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        this.NgxSpinnerService.hide('completo');

        this.id = null;

        return;
      }

      this.listaUnidades = response.result;
    });
  }

  onChangeUnidade(codColigada: any, codTipoCurso: any, codFilial: any) {
    $("#idPerLet").val("");

    this.plano.idPerLet = null;

    this.listaCategorias = [];
    this.listaPeriodoLetivo = [];

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
    if (!this.id) {
      this.listaPeriodoLetivo = [];
      this.listaBolsas = [];
      this.listaServicos = [];
      this.listaConvenios = [];

      $("#idPerLet").val("");

      this.plano.idPerLet = null;

      this.parcela = {};

      this.plano.parcelas = [];
    }

    $("#bolsas").val('').trigger('change');

    this.NgxSpinnerService.show();

    this.PlanoService.GetPeriodoLetivo(codColigada, codTipoCurso, codFilial, idCategoriaPs).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        this.NgxSpinnerService.hide('completo');

        this.id = null;

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        this.NgxSpinnerService.hide('completo');

        this.id = null;

        return;
      }

      this.listaPeriodoLetivo = response.result;
    });
  }

  onChangePeriodoLetivo(codColigada: any, codTipoCurso: any, idPerLet: any) {
    if (!this.id) {
      this.listaBolsas = [];
      this.listaServicos = [];
      this.listaConvenios = [];

      this.parcela = {};

      this.plano.parcelas = [];
    }

    $("#bolsas").val('').trigger('change');

    this.NgxSpinnerService.show();

    this.PlanoService.GetTipoServico(codColigada, codTipoCurso, idPerLet).subscribe((response: any) => {
      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        this.NgxSpinnerService.hide();
        this.NgxSpinnerService.hide('completo');

        this.id = null;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        this.NgxSpinnerService.hide();
        this.NgxSpinnerService.hide('completo');

        this.id = null;
      } else {
        this.listaServicos = response.result;
      }

      this.PlanoService.GetBolsa(codColigada, codTipoCurso, idPerLet).subscribe((response: any) => {
        if (response.statusCode == 404) {
          this.toastr.warning(response.message);

          this.NgxSpinnerService.hide();
          this.NgxSpinnerService.hide('completo');

          this.id = null;
        } else if (response.statusCode != 200) {
          this.toastr.error(response.message);

          this.NgxSpinnerService.hide();
          this.NgxSpinnerService.hide('completo');

          this.id = null;
        } else {
          this.listaBolsas = response.result;
        }

        this.PlanoService.GetConvenio(codColigada).subscribe((response: any) => {
          this.NgxSpinnerService.hide();
          this.NgxSpinnerService.hide('completo');

          this.id = null;

          if (response.statusCode == 404) {
            this.toastr.warning(response.message);
          } else if (response.statusCode != 200) {
            this.toastr.error(response.message);
          } else {
            this.listaConvenios = response.result;
          }

        });
      });
    });
  }

  onSubmitFormPlano(plano: any) {
    if (!plano.codTipoCurso) {
      this.toastr.warning("Favor selecionar o tipo de curso");
    } else if (!plano.codFilial) {
      this.toastr.warning("Favor selecionar a unidade");
    } else if (!plano.idPerLet) {
      this.toastr.warning("Favor selecionar o período letivo");
    } else if (!plano.nome) {
      this.toastr.warning("Favor informar o nome da campanha");
    } else if (!plano.dtInicio) {
      this.toastr.warning("Favor informar a data inicial");
    } else if (!plano.dtFim) {
      this.toastr.warning("Favor informar a data final");
    } else if (!plano.hrInicio) {
      this.toastr.warning("Favor informar a hora inicial");
    } else if (!plano.hrFim) {
      this.toastr.warning("Favor informar a hora final");
    } else {
      Swal.fire({
        title: '<strong style="color:#ff5c00">Confirmação</strong>',
        text: 'Deseja realmente cadastrar o plano?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#ff5c00'
      }).then((result) => {
        if (result.isConfirmed) {
          this.NgxSpinnerService.show();

          var planoRequest = JSON.parse(JSON.stringify(plano));

          planoRequest.parcelas.forEach(parcela => {
            if (!parcela.bolsas[0].codBolsa) {
              parcela.bolsas = [];
            }
          });

          planoRequest.dtInicio = plano.dtInicio + 'T' + plano.hrInicio + ':00';
          planoRequest.dtFim = plano.dtFim + 'T' + plano.hrFim + ':00';

          this.PlanoService.CadasrarPlano(planoRequest).subscribe((response: any) => {
            this.NgxSpinnerService.hide();

            if (response.statusCode == 200) {
              this.toastr.success("Plano cadastrado com sucesso!");

              this.Router.navigateByUrl("/administrativo/campanha/planos");
            } else {
              this.toastr.error(response.message);
            }
          });
        }
      });
    }
  }

  addParcela(parcela: any) {
    this.plano.parcelas = this.plano.parcelas || [];

    if (!parcela.parcela || parcela.parcela < 1 || !parcela.servico || (parcela.gerarLancamento && !parcela.convenio)) {
      this.toastr.warning("Favor preencher todos os campos");

      return;
    } else if (this.plano.parcelas.filter(item => {
      return item.parcela == parcela.parcela;
    }).length > 0) {
      this.toastr.warning("Parcela já cadastrada");

      return;
    } else if (parcela.gerarLancamento && this.plano.parcelas.filter(item => {
      return item.gerarLancamento;
    }).length > 0) {
      this.toastr.warning("Já existe uma parcela para gerar lançamento");

      return;
    }

    if (parcela.gerarLancamento) {
      this.plano.parcelaLan = parcela.parcela;
    }

    parcela.bolsas = [];

    $('#bolsas').val().forEach(bolsaSelecionada => {
      this.listaBolsas.forEach(bolsa => {
        if (bolsa.codBolsa == bolsaSelecionada) {
          bolsa.ordemAplicacao = parcela.bolsas.length + 1;

          bolsa.valor = bolsa.desconto;

          parcela.bolsas.push(Object.assign({}, bolsa));
        }
      });
    });

    //Se plano privado, desativar convenio caso for selecionado.
    if(this.plano.codPsTipoPlano == 2){
      parcela.permiteConvenio = false;
    }

    this.plano.parcelas.push({
      codServico: parcela.servico.codServico,
      codColigada: this.plano.codColigada,
      servico: parcela.servico.codServico + " - " + parcela.servico.descricaoServico,
      parcela: parcela.parcela,
      gerarLancamento: parcela.gerarLancamento,
      permiteConvenio: parcela.permiteConvenio || false,
      geraLanIntegracao: parcela.geraLanIntegracao || false,
      bolsas: parcela.bolsas.length > 0 ? parcela.bolsas : [{ descricaoBolsa: "-", descricaoTipoDesc: "--", descricaoTipoBolsa: "--", ordemAplicacao: "--" }],
      idConvenio: parcela.gerarLancamento ? parcela.convenio.idConvenio : null, //parcela.servico.idConvenio,      
      banco: parcela.gerarLancamento ? parcela.convenio.numBanco + ' - ' + parcela.convenio.nomeBanco : "--",
      codCxa: parcela.gerarLancamento ? parcela.convenio.codCxa : "--"
    });

    this.parcela = {};

    $("#bolsas").val('').trigger('change');
  }

  removerParcela(parcela: any) {
    this.plano.parcelas.remove(parcela);
  }

  duplicarParcela(parcela: any) {
    var novaParcela = JSON.parse(JSON.stringify(parcela));

    novaParcela.parcela = this.plano.parcelas.map(x => x.parcela).max() + 1;

    this.plano.parcelas.push(novaParcela);
  }

  existeParcelaGerarLancamento() {
    return this.plano.parcelas.filter(x => x.gerarLancamento).length > 0;
  }
}