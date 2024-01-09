import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { AtendimentoService } from '@services/atendimento.service';
import { BaseComponent } from "../../base.component";
import Swal from 'sweetalert2';

declare var moment: any;
class InfoContato {
    constructor() {
        this.cadastroValidado = false;
    }

    codPsAtendimento: number;
    codPsUsuario: number;
    codPsLead: number;
    codPsPessoa: number;
    cpf: string;
    nome: string;
    dataNascimento: Date;
    dataNascimentoSemFormatacao: string;
    protocolo: string;
    cadastroValidado: boolean;
    email: string;
    celular: string;
    telefone: string;
}

@Component({
    selector: 'app-registration-change',
    templateUrl: './registration-change.component.html',
    styleUrls: ['./registration-change.component.scss']
})
export class RegistrationChangeComponent extends BaseComponent implements OnInit {
    cpfmask: string = "000.000.000-00";
    celmask: string = "(00) 0?0000-0000";
    telmask: string = "(00) 0000-0000"

    filtroAtivo: boolean = false;
    atendimentoIniciado: boolean = false;
    infoContato: InfoContato = new InfoContato();

    constructor(private toastr: ToastrService,
        private AtendimentoService: AtendimentoService,
        private NgxSpinnerService: NgxSpinnerService) {
        super();
    }

    ngOnInit(): void {

    }

    pesquisar(cpf: string) {
        this.NgxSpinnerService.show();
        this.AtendimentoService.GetInfoCandidato({ cpf }).subscribe((response: any) => {
            this.NgxSpinnerService.hide();
            if (response.statusCode == 404) {
                this.toastr.warning(response.message);
                return;
            } else if (response.statusCode != 200) {
                this.toastr.error(response.message);
                return;
            }

            if (response.result === null) {
                this.toastr.warning('CPF não encontrado!');
                return;
            }

            this.infoContato = response.result;
            this.filtroAtivo = true;
        });
    }

    voltar() {
        this.infoContato = new InfoContato();
        this.filtroAtivo = false;
        this.atendimentoIniciado = false;
    }

    iniciarAtendimento() {
        Swal.fire({
            title: '<strong style="color:#ff5c00">Confirmação</strong>',
            text: 'Informe o número de protocolo, para iniciar o atendimento. Deseja prosseguir?',
            icon: 'question',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            cancelButtonText: 'Não',
            confirmButtonText: 'Sim',
            confirmButtonColor: '#ff5c00',
            preConfirm: (protocolo) => {
                this.infoContato.protocolo = protocolo;
                return;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                this.NgxSpinnerService.show();
                this.AtendimentoService.IniciarAtendimento(this.infoContato).subscribe((response: any) => {
                    this.NgxSpinnerService.hide();
                    if (response.statusCode == 404) {
                        this.toastr.warning(response.message);
                        return;
                    } else if (response.statusCode != 200) {
                        this.toastr.error(response.message);
                        return;
                    }

                    this.infoContato = response.result;
                    this.atendimentoIniciado = true;
                });
            }
        });
    }

    cancelarAtendimento() {
        Swal.fire({
            title: '<strong style="color:#ff5c00">Confirmação</strong>',
            text: 'Deseja cancelar o atendimento?',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'Não',
            confirmButtonText: 'Sim',
            confirmButtonColor: '#ff5c00'
        }).then((result) => {
            if (result.isConfirmed) {
                this.NgxSpinnerService.show();
                this.AtendimentoService.CancelarAtendimento(this.infoContato).subscribe((response: any) => {
                    this.NgxSpinnerService.hide();
                    if (response.statusCode == 404) {
                        this.toastr.warning(response.message);
                        return;
                    } else if (response.statusCode != 200) {
                        this.toastr.error(response.message);
                        return;
                    }

                    this.toastr.success('Atendimento cancelado com sucesso!');
                    this.voltar();
                });
            }
        });
    }

    finalizarAtendimento() {
        Swal.fire({
            title: '<strong style="color:#ff5c00">Confirmação</strong>',
            text: 'Deseja finalizar o atendimento?',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'Não',
            confirmButtonText: 'Sim',
            confirmButtonColor: '#ff5c00'
        }).then((result) => {
            if (result.isConfirmed) {
                this.NgxSpinnerService.show();
                this.AtendimentoService.FinalizarAtendimento(this.infoContato).subscribe((response: any) => {
                    this.NgxSpinnerService.hide();
                    if (response.statusCode == 404) {
                        this.toastr.warning(response.message);
                        return;
                    } else if (response.statusCode != 200) {
                        this.toastr.error(response.message);
                        return;
                    }

                    this.toastr.success('Atendimento finalizado com sucesso!');
                    this.voltar();
                });
            }
        });
    }

    alterarCadastro() {
        this.NgxSpinnerService.show();
        this.AtendimentoService.AlterarCadastro(this.infoContato).subscribe((response: any) => {
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
    reenviarSenha() {
        this.NgxSpinnerService.show();
        this.AtendimentoService.ReenviarSenha(this.infoContato).subscribe((response: any) => {
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
    enviarSenhaPadrao() {
        this.NgxSpinnerService.show();
        this.AtendimentoService.EnviarSenhaPadrao(this.infoContato).subscribe((response: any) => {
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

    desbloquearAcesso() {
        this.NgxSpinnerService.show();
        this.AtendimentoService.DesbloquearAcesso(this.infoContato).subscribe((response: any) => {
            console.log(response);
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
}