import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { CobrancaService } from '@services/cobranca.service';
import { NgForm } from '@angular/forms';
import { BaseComponent } from '../../base.component';
import Swal from 'sweetalert2';
import { NgxMaskModule } from 'ngx-mask';

declare var $: any;

@Component({
  selector: 'app-bank-slip',
  templateUrl: './bank-slip.component.html',
  styleUrls: ['./bank-slip.component.scss']
})
export class BankSlipComponent extends BaseComponent implements OnInit {
  @ViewChild('formBaixa') formBaixa: NgForm;

  data: any = [];

  baixa: any = {
    cpf: null,
    nossonumero: null
  }

  cartao: any = {
    codPsLan: null,
    tid: null,
    dtPagamento: null,
    dtCredito: null
  }

  boleto: any = {
    codPsLan: null,
    nossoNumero: null,
    dtPagamento: null,
    dtCredito: null
  }

  mask: string;

  constructor(private Router: Router,
    private CobrancaService: CobrancaService,
    private chRef: ChangeDetectorRef,
    private toastr: ToastrService,
    private NgxSpinnerService: NgxSpinnerService
  ) {
    super();
  }

  ngOnInit() {
    // this.pesquisar(this.baixa);
  }

  onSubmitPesquisar(baixa) {
    if (!baixa.cpf && !baixa.nossonumero) {
      this.toastr.warning("Favor informar um filtro!");
    } else {
      this.pesquisar(baixa);
    }
  }

  pesquisar(baixa) {

    this.NgxSpinnerService.show();

    this.data = [];

    if (baixa.cpf != null)
      baixa.cpf = baixa.cpf.replace(/[^0-9]/g, "");

    this.CobrancaService.GetBaixaManual(baixa).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      if (response.result.length > 0) {
        this.data = response.result;
      }
      else {
        this.toastr.info("Lançamento não encontrado!");
      }
    });
  }

  onSubmiBaixarCartao(codPsLan: any) {
    Swal.fire({
      title: '<strong style="color:#ff5c00">Baixa de Cartão</strong>',
      html: `<input id="tid" placeholder="TID" class="swal2-input">
      <label style="float:left">Data Pagamento</label>
      <input id="dtPagamento" class="swal2-input" type="date">
      <label style="float:left">Data Crédito</label>
      <input id="dtCredito" class="swal2-input" type="date" placeholder="DATA CRÉDITO">`,
      focusConfirm: false,
      text: 'Deseja realmente baixar este lançamento por Cartão?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#ff5c00',
      preConfirm: () => {
        const dtPagamento = $('#dtPagamento').val();
        const dtCredito = $('#dtCredito').val();
        const tid = $('#tid').val();
        if (!dtPagamento || !dtCredito || !tid) {
          if (!tid) Swal.showValidationMessage(`Para prosseguir é preciso digitar o TID que esta no comprovante do candidato. `)
          else Swal.showValidationMessage(`Para prosseguir é preciso a data do pagamento e a data crédito. `)
        }
        else if (this.compararData(dtPagamento)) {
          Swal.showValidationMessage(`Para prosseguir a data de pagamento não pode ser maior do que a data atual. `);
        }
        return { dtPagamento: dtPagamento, dtCredito: dtCredito, tid: tid }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.NgxSpinnerService.show();

        this.cartao.codPsLan = codPsLan;
        this.cartao.tid = result.value.tid
        this.cartao.dtPagamento = result.value.dtPagamento
        this.cartao.dtCredito = result.value.dtCredito
        this.CobrancaService.RealizarPagamentoManualCartao(this.cartao).subscribe((response: any) => {

          this.pesquisar(this.baixa);
          this.NgxSpinnerService.hide();

          if (response.statusCode == 200) {
            this.toastr.success("Lançamento baixado com sucesso!");
          } else {
            this.toastr.error(response.message);
          }
        });
      }
    })
    // Swal.fire({
    //   title: '<strong style="color:#ff5c00">Baixa de Cartão</strong>',
    //   html:
    //   `<input id="swal-input1" id="tid" autocapitalize="off" placeholder="TID" class="swal2-input">' +
    //   '<label style="float:left">Data Pagamento</label>'+
    //   '<input id="dtPagamento" class="swal2-input" type="date" class="swal2-input">' +
    //   '<label style="float:left">Data Crédito</label>'+
    //   '<input id="dtCredito" class="swal2-input" type="date" placeholder="DATA CRÉDITO" class="swal2-input">`,
    //   // inputValidator: (value) => {
    //   //   console.log(value)
    //   //   return new Promise((resolve) => {
    //   //     if (value.length > 0) {
    //   //       this.cartao.tid = value;
    //   //       resolve('');
    //   //     }
    //   //     else{
    //   //       resolve('Para prosseguir é preciso digitar o TID que esta no comprovante do candidato.')
    //   //     }
    //   //   })
    //   // },
    //   preconfirm: () => {
    //     const dtPagamento = Swal.getPopup().querySelector('#dtPagamento');
    //     const dtCredito = Swal.getPopup().querySelector('#dtCredito');
    //     const tid = Swal.getPopup().querySelector('#tid');

    //     if (!dtPagamento || !dtCredito || !tid) {
    //       Swal.showValidationMessage(`Please enter login and password`)
    //     }
    //       return {dtPagamento: dtPagamento, dtCredito: dtCredito, tid: tid}
    //  },
    //   text: 'Deseja realmente baixar este lançamento por Cartão?',
    //   icon: 'question',
    //   showCancelButton: true,
    //   cancelButtonText: 'Cancelar',
    //   confirmButtonText: 'Continuar',
    //   confirmButtonColor: '#ff5c00',

    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     // this.NgxSpinnerService.show();

    //     // this.cartao.codPsLan = codPsLan;

    //     // this.CobrancaService.RealizarPagamentoManualCartao(this.cartao).subscribe((response: any) => {

    //     //   this.pesquisar(this.baixa);
    //     //   this.NgxSpinnerService.hide();

    //     //   if (response.statusCode == 200) {
    //     //     this.toastr.success("Lançamento baixado com sucesso!");
    //     //   } else {
    //     //     this.toastr.error(response.message);
    //     //   }
    //     // });
    //   }
    // });
  }

  onSubmiBaixarBoleto(codPsLan: any) {
    Swal.fire({
      title: '<strong style="color:#ff5c00">Baixa de Boleto</strong>',
      html: `<input id="nossoNumero" placeholder="Nosso Número" class="swal2-input">
      <label style="float:left">Data Pagamento</label>
      <input id="dtPagamentoBoleto" class="swal2-input" type="date">
      <label style="float:left">Data Crédito</label>
      <input id="dtCreditoBoleto" class="swal2-input" type="date" placeholder="DATA CRÉDITO">`,
      inputAttributes: {
        autocapitalize: 'off'
      },
      preConfirm: () => {
        const dtPagamento = $('#dtPagamentoBoleto').val();
        const dtCredito = $('#dtCreditoBoleto').val();
        const nossoNumero = $('#nossoNumero').val();
        if (!dtPagamento || !dtCredito || !nossoNumero) {
          if (!nossoNumero) Swal.showValidationMessage(`Para prosseguir é preciso digitar o Nosso Número que esta no comprovante do candidato.`)
          else Swal.showValidationMessage(`Para prosseguir é preciso a data do pagamento e a data crédito. `)
        }
        else if (this.compararData(dtPagamento)) {
          Swal.showValidationMessage(`Para prosseguir a data de pagamento não pode ser maior do que a data atual. `);
        }
        return { dtPagamento: dtPagamento, dtCredito: dtCredito, nossoNumero: nossoNumero }
      },
      text: 'Deseja realmente baixar este lançamento por boleto?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#ff5c00',

    }).then((result) => {
      if (result.isConfirmed) {

        this.NgxSpinnerService.show();
        this.boleto.codPsLan = codPsLan;
        this.boleto.dtPagamento = result.value.dtPagamento
        this.boleto.dtCredito = result.value.dtCredito
        this.boleto.nossoNumero = result.value.nossoNumero
        this.CobrancaService.RealizarPagamentoManualBoleto(this.boleto).subscribe((response: any) => {
          this.pesquisar(this.baixa);
          this.NgxSpinnerService.hide();

          if (response.statusCode == 200) {
            this.toastr.success("Lançamento baixado com sucesso!");
          } else {
            this.toastr.error(response.message);
          }
        });
      }
    });
  }

  cpfcnpjmask() {
    const value = this.baixa.cpf;
    if (value.length <= 14) {
      this.mask = '000.000.000-00'
    }
  }

  public compararData(value: any): boolean {
    var partesData = String(value).split("-");
    var data = new Date(Number(partesData[0]), Number(partesData[1]) - 1, Number(partesData[2]));
    var dataAtual = new Date();
    var dataAtualAux = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate());
    return data > dataAtualAux;
  }
}
