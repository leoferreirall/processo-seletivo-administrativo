import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { AtendimentoService } from '@services/atendimento.service';
import { BaseComponent } from "../../base.component";
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Route, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from "@angular/platform-browser";
import { AcessoPainelCandidatoService } from "@services/acessoPainelCandidato.service";
import { Crypt } from 'hybrid-crypto-js'
import { AcessoToscana } from "src/app/Models/AcessoToscana";
import { AuthService } from "@services/auth/auth.service";
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-acesso-candidato',
  templateUrl: './acesso-candidato.component.html',
  styleUrls: ['./acesso-candidato.component.scss']
})
export class AcessoCandidatoComponent implements OnInit {

  public cpfmask: string = "000.000.000-00";
  public form!: FormGroup;
  private acessoToscana = {} as AcessoToscana;
  private linkPSBase = '';
  public linkPSCompleto: any;
  public visualizaoAluno: boolean = false;

  get f(): any { return this.form.controls; }

  constructor(
    private toastr: ToastrService,
    private AtendimentoService: AtendimentoService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private painelCandidatoService: AcessoPainelCandidatoService,
    private auth: AuthService,
    private router: Router) {

  }

  ngOnInit() {
    this.acessoToscana.userName = this.auth.getUser()?.userName;
    this.validacao();
  }

  private validacao() {
    this.form = this.fb.group({
      cpf: ['', [Validators.required]],
    });
  }

  sairVisualizacao() {
    this.visualizaoAluno = false;
    this.linkPSBase = '';
  }

  registrarAcessoToscana() {
    if (this.form.valid) {
      this.acessoToscana.cpf = this.form.value.cpf;
      this.spinner.show();
      this.painelCandidatoService.RegistrarAcessoToscana(this.acessoToscana).subscribe(
        (response: any) => {
          if (response.statusCode != 200) {
            this.toastr.warning(response.message);
            return;
          }
          else {
            //SE O RETORNO DA API FOR FALSE SIGNIFICA QUE O ALUNO TEM INSCRIÇÃO DE MEDICINA
            if (!response.result) {
              Swal.fire('ACESSO INVÁLIDO', `Os dados informados referem-se a uma inscrição de medicina.
               Por favor oriente o candidato que verifique as etapas da sua inscrição dentro do painel e realize as alterações necessárias.`, 'warning')
            } else {
              // this.visualizaoAluno = true;
              this.getLink();
            }
          }
        },
        (error: Error) => {
          this.toastr.error(error.message);
        },
        () => {
          this.spinner.hide();
          this.form.reset();
        }
      );
    }
  }

  getLink() {
    this.linkPSBase = environment.urlAcessoToscana;
    var complementoLink = this.acessoToscana.cpf;
    this.linkPSBase += `?c=${btoa(complementoLink)}&t=${btoa(this.auth.getToken())}`;
    window.open(this.linkPSBase);
    this.linkPSCompleto = this.sanitizer.bypassSecurityTrustResourceUrl(this.linkPSBase);
  }

}
