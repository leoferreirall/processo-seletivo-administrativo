import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentoService } from '@services/documento.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contract-edition',
  templateUrl: './contract-edition.component.html',
  styleUrls: ['./contract-edition.component.scss']
})
export class ContractEditionComponent implements OnInit {
  @ViewChild('formDocumento') formDocumento: NgForm;

  date = new Date();

  documento: any = {
    codPsDoc: null,
    codTipoCurso: null,
    codPsTipoDoc: 4,
    texto: null,
    dtInicioVigencia: null,
    dtFimVigencia: null    
  };

  quillConfig={
     toolbar: {
       container: [
         ['bold', 'italic', 'underline', 'strike'],       
         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
         [{ 'indent': '-1'}, { 'indent': '+1' }],  
         [{ 'size': ['small', false, 'large', 'huge'] }],
         [{ 'align': [] }],
         ['clean'] 
       ],
     }
  }
  
  constructor(private Router: Router,
    private DocumentoService: DocumentoService,
    private toastr: ToastrService,
    private NgxSpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.consultaContratoVigente();
  }

  consultaContratoVigente() {
    this.NgxSpinnerService.show();

    this.DocumentoService.GetHtmlDocumentoVigente('4').subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }
  
      this.documento = response.result;    

      // this.documento.dtInicioVigencia = this.documento.dtInicioVigencia.substring(0, 10);
      // this.documento.dtFimVigencia = this.documento.dtFimVigencia.substring(0, 10);

      this.documento.dtInicioVigencia = this.date.toISOString().substring(0, 10);
      this.documento.dtFimVigencia = new Date(this.date.getFullYear() + 5, this.date.getMonth(), this.date.getDate()).toISOString().substring(0, 10);
      
    });
  }

  onSubmitForm(documento: any) {
    if (!documento.dtInicioVigencia) {
      this.toastr.warning("Favor informar uma data início.");
    } else if (!documento.dtFimVigencia) {
      this.toastr.warning("Favor informar uma data fim.");    
    } else {
      Swal.fire({
        title: '<strong style="color:#ff5c00">Confirmação</strong>',
        html: 'Deseja realmente atualizar o contrato? <br /> Obs.: <br />  Os contratos já aceitos pelos candidatos, não será afetados pela nova atualização. <br /> Os contratos já lidos até o momento pelos candidatos poderá ser aceitos na versão antiga.',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#ff5c00'
      }).then((result) => {        
        if (result.isConfirmed) {
          this.NgxSpinnerService.show();

          this.DocumentoService.CriarNovoDocumento(documento).subscribe((response: any) => {
            this.NgxSpinnerService.hide();
   
            if (response.statusCode == 200) {
              this.toastr.success("Contrato atualizado com sucesso!", null, {
                disableTimeOut: true, 
              });
              this.consultaContratoVigente();
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

}
