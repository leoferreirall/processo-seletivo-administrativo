import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Form, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { PlanoService } from '@services/plano.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-plan-edit',
  templateUrl: './plan-edit.component.html',
  styleUrls: ['./plan-edit.component.scss']
})
export class PlanEditComponent implements OnInit {
  @ViewChild('formPlano') formPlano: NgForm;

  id: any;

  listaTipoCurso: any[] = [];
  listaUnidades: any[] = [];
  listaPeriodoLetivo: any[] = [];
  listaBolsas: any[] = [];
  listaServicos: any[] = [];

  plano: any = {
    codPsPlano: null,
    codColigada: null,
    codTipoCurso: null,
    codFilial: null,
    idPerLet: null,
    idCategoriaPs: null,
    nome: null,
    status: true,
    parcelaLan: null,
    dtInicio: new Date().toISOString().substring(0, 10),
    dtFim: new Date().toISOString().substring(0, 10),
    hrInicio: new Date().toISOString().substring(11, 16),
    hrFim: new Date().toISOString().substring(11, 16),
    parcelas: [],
    bolsas: [],
    tipoCurso: {},
    tipoPlanoPrivado: false
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
    private Router: Router,
    private ActivatedRoute: ActivatedRoute,
    private NgxSpinnerService: NgxSpinnerService) {
  }

  ngOnInit() {
    this.NgxSpinnerService.show();
    this.id = this.ActivatedRoute.snapshot.paramMap.get("id");
    
    this.PlanoService.GetTipoCurso().subscribe((response: any) => {
      if (response.statusCode == 404) {
        this.toastr.warning(response.message);
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);
      } else {
        this.listaTipoCurso = response.result;
      }
      
      this.PlanoService.GetPlanoById(this.id).subscribe((response: any) => {
        if (response.statusCode == 404) {
          this.toastr.warning(response.message);
          this.NgxSpinnerService.hide();
        } else if (response.statusCode != 200) {
          this.toastr.error(response.message);
        } else {
          this.plano = JSON.parse(JSON.stringify(response.result));

          this.plano.dtInicio = response.result.dtInicio.toString().substring(0, 10);
          this.plano.dtFim = response.result.dtFim.toString().substring(0, 10);
          this.plano.hrInicio = response.result.dtInicio.toString().substring(11, 16);
          this.plano.hrFim = response.result.dtFim.toString().substring(11, 16);

          this.PlanoService.GetUnidade(this.plano.codColigada, this.plano.codTipoCurso).subscribe((response: any) => {
            if (response.statusCode == 404) {
              this.toastr.warning(response.message);
              this.NgxSpinnerService.hide();
            } else if (response.statusCode != 200) {
              this.toastr.error(response.message);
            } else{
              this.listaUnidades = response.result;
            }
          });

          this.PlanoService.GetPeriodoLetivo(this.plano.codColigada, this.plano.codTipoCurso, this.plano.codFilial, this.plano.idCategoriaPs).subscribe((response: any) => {
            if (response.statusCode == 404) {
              this.toastr.warning(response.message);
              this.NgxSpinnerService.hide();
            } else if (response.statusCode != 200) {
              this.toastr.error(response.message);
            } else{
              this.listaPeriodoLetivo = response.result;
            }
            this.NgxSpinnerService.hide();
          });

        }
      });

    });

    $('.select2').select2();
  }

  onChangeTipoCurso(codColigada: any, codTipoCurso: any) {
    this.plano.codColigada = codColigada;
    this.plano.codTipoCurso = codTipoCurso;
    
    this.listaUnidades = [];
    this.listaPeriodoLetivo = [];
    this.listaBolsas = [];
    this.listaServicos = [];

    $("#codFilial").val("");

    this.plano.codFilial = null;
    this.plano.idPerLet = null;

    this.parcela = {};

    this.plano.parcelas = [];

    $("#bolsas").val('').trigger('change');

    this.PlanoService.GetUnidade(codColigada, codTipoCurso).subscribe((response: any) => {
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
    this.listaPeriodoLetivo = [];
    this.listaBolsas = [];
    this.listaServicos = [];

    $("#idPerLet").val("");

    this.plano.idPerLet = null;

    this.parcela = {};

    this.plano.parcelas = [];

    $("#bolsas").val('').trigger('change');

    this.PlanoService.GetPeriodoLetivo(codColigada, codTipoCurso, codFilial, 0).subscribe((response: any) => {
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
    this.listaServicos = [];
    this.listaBolsas = [];

    this.parcela = {};

    this.plano.parcelas = [];

    $("#bolsas").val('').trigger('change');

    this.PlanoService.GetTipoServico(codColigada, codTipoCurso, idPerLet).subscribe((response: any) => {
      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      this.listaServicos = response.result;
    });

    this.PlanoService.GetBolsa(codColigada, codTipoCurso, idPerLet).subscribe((response: any) => {
      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      this.listaBolsas = response.result;
    });
  }

  onChangeServico(servico) {
    this.parcela.banco = servico.codBanco + ' ' + servico.descricaoBanco;
  }

  onSubmitFormPlano(plano) {
    if (!plano.dtInicio) {
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
        text: 'Deseja realmente alterar o plano?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#ff5c00'
      }).then((result) => {
        if (result.isConfirmed) {
          this.NgxSpinnerService.show();

          plano.parcelas = null;

          plano.dtInicio = plano.dtInicio + 'T' + plano.hrInicio + ':00';
          plano.dtFim = plano.dtFim + 'T' + plano.hrFim + ':00';

          this.PlanoService.AtualizarPlano(plano).subscribe((response: any) => {
            this.NgxSpinnerService.hide();

            if (response.statusCode == 200) {
              this.toastr.success("Plano atualizado com sucesso!");
    
              this.Router.navigateByUrl("/administrativo/campanha/planos");
            } else {
              this.toastr.error(response.message);
            }
          });
        }
      });
    }
  }

  addParcela(parcela) {
    this.plano.parcelas = this.plano.parcelas || [];

    if (!parcela.parcela || parcela.parcela < 1 || !parcela.servico) {
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

    this.plano.parcelas.push({
      codServico: parcela.servico.codServico,
      codColigada: this.plano.codColigada,
      servico: parcela.servico.codServico + " - " + parcela.servico.descricaoServico,
      parcela: parcela.parcela,
      banco: parcela.banco,
      codCxa: parcela.servico.codCxa,
      gerarLancamento: parcela.gerarLancamento,
      permiteConvenio: parcela.permiteConvenio || false,
      geraLanIntegracao: parcela.geraLanIntegracao || false,
      bolsas: parcela.bolsas
    });

    this.parcela = {};

    $("#bolsas").val('').trigger('change');

  }

  removerParcela(parcela) {
    this.plano.parcelas.remove(parcela);
  }
}
