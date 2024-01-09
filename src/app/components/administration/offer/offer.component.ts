import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConvenioService } from '@services/convenio.service';
import { saveAs } from 'file-saver';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  @ViewChild('formConvenio') formConvenio: NgForm;
  @ViewChild('formFile') formFile: NgForm;

  listaTipoCurso: any[] = [];
  listaUnidades: any[] = [];
  listaCategorias: any[] = [];
  listaPeriodoLetivo: any[] = [];
  listaCursos: any[] = [];
  listaBolsas: any[] = [];
  listaTurnos: any[] = [];
  listaEstados: any[] = [];
  listaCidades: any[] = [];
  listaPolos: any[] = [];
  listaFormaIngresso: any[] = [];
  listaSemestres: any[] = [];

  convenio: any = {
    codColigada: null,
    codTipoCurso: null,
    codFilial: null,
    idCategoriaPs: null,
    idPerLet: null,
    cursos: null,
    bolsas: null,
    turnos: null,
    estados: null,
    cidades: null,
    polos: null,
    formasIngresso: null,
    semestres: null,
    selectAll: {
      cursos: false,
      bolsas: false,
      turnos: false,
      estados: false,
      cidades: false,
      polos: false,
      formasIngresso: false,
      semestres: false
    },
    tipoConsulta: 1,
    publicar: false
  };  

  mensagemSucesso: any = '';
  mensagemErro: any = '';

  file: File;

  constructor(private toastr: ToastrService,
    private ConvenioService: ConvenioService,
    private NgxSpinnerService: NgxSpinnerService) {
  }

  ngOnInit() {
    this.NgxSpinnerService.show();

    this.ConvenioService.GetTipoCurso().subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      this.getExisteConvenioTemp();

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
    this.convenio.codColigada = codColigada;
    this.convenio.codTipoCurso = codTipoCurso;

    $("#codFilial").val("");

    this.convenio.codFilial = null;
    this.convenio.idCategoriaPs = null;
    this.convenio.idPerLet = null;
    this.convenio.cursos = [];
    this.convenio.bolsas = [];  
    this.convenio.turnos = [];
    this.convenio.formasIngresso = [];
    this.convenio.semestres = [];
    this.convenio.estados = [];
    this.convenio.cidades = [];
    this.convenio.polos = [];

    this.listaUnidades = [];
    this.listaCategorias = [];
    this.listaPeriodoLetivo = [];
    this.listaCursos = [];
    this.listaBolsas = [];
    this.listaTurnos = [];
    this.listaFormaIngresso = [];
    this.listaSemestres = [];
    this.listaEstados = [];
    this.listaCidades = [];
    this.listaPolos = [];    

    this.convenio.selectAll.cursos = false;
    this.convenio.selectAll.bolsas = false;    
    this.convenio.selectAll.turnos = false;
    this.convenio.selectAll.formasIngresso = false;
    this.convenio.selectAll.semestres = false;
    this.convenio.selectAll.estados = false;
    this.convenio.selectAll.cidades = false;
    this.convenio.selectAll.polos = false;

    this.NgxSpinnerService.show();

    this.ConvenioService.GetUnidade(codColigada, codTipoCurso).subscribe((response: any) => {
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

    this.convenio.idPerLet = null;
    this.convenio.cursos = [];
    this.convenio.bolsas = [];  
    this.convenio.turnos = [];
    this.convenio.formasIngresso = [];
    this.convenio.semestres = [];
    this.convenio.estados = [];
    this.convenio.cidades = [];
    this.convenio.polos = [];

    this.listaPeriodoLetivo = [];
    this.listaCursos = [];
    this.listaBolsas = [];
    this.listaTurnos = [];
    this.listaFormaIngresso = [];
    this.listaSemestres = [];
    this.listaEstados = [];
    this.listaCidades = [];
    this.listaPolos = [];    

    this.convenio.selectAll.cursos = false;
    this.convenio.selectAll.bolsas = false;    
    this.convenio.selectAll.turnos = false;
    this.convenio.selectAll.formasIngresso = false;
    this.convenio.selectAll.semestres = false;
    this.convenio.selectAll.estados = false;
    this.convenio.selectAll.cidades = false;
    this.convenio.selectAll.polos = false;

    this.NgxSpinnerService.show();

    this.ConvenioService.GetCategoria(codColigada, codTipoCurso, codFilial).subscribe((response: any) => {
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

    this.convenio.cursos = [];
    this.convenio.bolsas = [];  
    this.convenio.turnos = [];
    this.convenio.formasIngresso = [];
    this.convenio.semestres = [];
    this.convenio.estados = [];
    this.convenio.cidades = [];
    this.convenio.polos = [];
    this.listaCursos = [];
    this.listaBolsas = [];
    this.listaTurnos = [];
    this.listaFormaIngresso = [];
    this.listaSemestres = [];
    this.listaEstados = [];
    this.listaCidades = [];
    this.listaPolos = [];    

    this.convenio.selectAll.cursos = false;
    this.convenio.selectAll.bolsas = false;    
    this.convenio.selectAll.turnos = false;
    this.convenio.selectAll.formasIngresso = false;
    this.convenio.selectAll.semestres = false;
    this.convenio.selectAll.estados = false;
    this.convenio.selectAll.cidades = false;
    this.convenio.selectAll.polos = false;

    this.NgxSpinnerService.show();

    this.ConvenioService.GetPeriodoLetivo(codColigada, codTipoCurso, codFilial, idCategoriaPs).subscribe((response: any) => {
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

    this.convenio.bolsas = [];  
    this.convenio.turnos = [];
    this.convenio.formasIngresso = [];
    this.convenio.semestres = [];
    this.convenio.estados = [];
    this.convenio.cidades = [];
    this.convenio.polos = [];

    this.listaBolsas = [];
    this.listaTurnos = [];
    this.listaFormaIngresso = [];
    this.listaSemestres = [];
    this.listaEstados = [];
    this.listaCidades = [];
    this.listaPolos = [];    

    this.convenio.selectAll.bolsas = false;    
    this.convenio.selectAll.turnos = false;
    this.convenio.selectAll.formasIngresso = false;
    this.convenio.selectAll.semestres = false;
    this.convenio.selectAll.estados = false;
    this.convenio.selectAll.cidades = false;
    this.convenio.selectAll.polos = false;

    this.NgxSpinnerService.show();

    this.ConvenioService.GetCurso(codColigada, codTipoCurso, codFilial, idCategoriaPs, idPerLet).subscribe((response: any) => {
      if (response.statusCode == 404) {
        this.toastr.warning(response.message);
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);
      } else {
        this.listaCursos = response.result;
      }

      this.ConvenioService.GetBolsa(codColigada, codTipoCurso, idCategoriaPs, idPerLet).subscribe((response: any) => {
        this.NgxSpinnerService.hide();

        if (response.statusCode == 404) {
          this.toastr.warning(response.message);
        } else if (response.statusCode != 200) {
          this.toastr.error(response.message);
        } else {
          this.listaBolsas = response.result;
        }

      });
    });
  }

  onBlurCurso(convenio: any) {
    convenio.cursos.remove(0);

    this.convenio.turnos = [];
    this.convenio.formasIngresso = [];
    this.convenio.semestres = [];
    this.convenio.estados = [];
    this.convenio.cidades = [];
    this.convenio.polos = [];

    this.listaTurnos = [];
    this.listaFormaIngresso = [];
    this.listaSemestres = [];
    this.listaEstados = [];
    this.listaCidades = [];
    this.listaPolos = [];    

    this.convenio.selectAll.turnos = false;
    this.convenio.selectAll.formasIngresso = false;
    this.convenio.selectAll.semestres = false;
    this.convenio.selectAll.estados = false;
    this.convenio.selectAll.cidades = false;
    this.convenio.selectAll.polos = false;

    this.NgxSpinnerService.show();

    this.ConvenioService.GetTurno(convenio).subscribe((response: any) => {
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

  onBlurBolsa(convenio: any) {
    convenio.bolsas.remove(0);
  }

  onBlurTipo(convenio: any) {
    // this.convenio.estados = [];
    this.convenio.cidades = [];
    this.convenio.polos = [];

    // this.convenio.selectAll.estados = false;
    this.convenio.selectAll.cidades = false;
    this.convenio.selectAll.polos = false;

    // this.listaEstados = [];
    this.listaCidades = [];
    this.listaPolos = [];
  }

  onBlurTurno(convenio: any) {
    convenio.turnos.remove(0);

    this.convenio.formasIngresso = [];
    this.convenio.semestres = [];
    this.convenio.estados = [];
    this.convenio.cidades = [];
    this.convenio.polos = [];

    this.listaFormaIngresso = [];
    this.listaSemestres = [];
    this.listaEstados = [];
    this.listaCidades = [];
    this.listaPolos = [];    

    this.convenio.selectAll.formasIngresso = false;
    this.convenio.selectAll.semestres = false;
    this.convenio.selectAll.estados = false;
    this.convenio.selectAll.cidades = false;
    this.convenio.selectAll.polos = false;

    this.NgxSpinnerService.show();

    this.ConvenioService.GetFormaIngresso(convenio).subscribe((response: any) => {
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

  onBlurFormaIngresso(convenio: any) {
    convenio.formasIngresso.remove(0);

    this.convenio.semestres = [];
    this.convenio.estados = [];
    this.convenio.cidades = [];
    this.convenio.polos = [];

    this.listaSemestres = [];
    this.listaEstados = [];
    this.listaCidades = [];
    this.listaPolos = [];    

    this.convenio.selectAll.semestres = false;
    this.convenio.selectAll.estados = false;
    this.convenio.selectAll.cidades = false;
    this.convenio.selectAll.polos = false;

    this.NgxSpinnerService.show();

    this.ConvenioService.GetSemestre(convenio).subscribe((response: any) => {
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

  onBlurSemestre(convenio: any) {
    convenio.semestres.remove(0);

    this.convenio.estados = [];
    this.convenio.cidades = [];
    this.convenio.polos = [];

    this.listaEstados = [];
    this.listaCidades = [];
    this.listaPolos = [];    

    this.convenio.selectAll.estados = false;
    this.convenio.selectAll.cidades = false;
    this.convenio.selectAll.polos = false;

    this.NgxSpinnerService.show();

    this.ConvenioService.GetEstado(convenio).subscribe((response: any) => {
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

  onBlurEstado(convenio: any) {
    convenio.estados.remove(0);

    this.convenio.cidades = [];
    this.convenio.polos = [];

    this.listaCidades = [];
    this.listaPolos = [];    

    this.convenio.selectAll.cidades = false;
    this.convenio.selectAll.polos = false;
    
    this.NgxSpinnerService.show();

    this.ConvenioService.GetCidade(convenio).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      if (this.convenio.tipoConsulta == 1) //Detalhada
        this.listaCidades = response.result;
      else //Agrupada
      {   
        if(!this.convenio.selectAll.estados)
          this.listaCidades = response.result;
      }
    });
  }

  onBlurCidade(convenio: any) {
    convenio.cidades.remove(0);

    this.convenio.polos = [];

    this.listaPolos = [];    

    this.convenio.selectAll.polos = false;

    this.NgxSpinnerService.show();

    this.ConvenioService.GetPolo(convenio).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      if (this.convenio.tipoConsulta == 1) //Detalhada
        this.listaPolos = response.result;
      else //Agrupada
      {   
        if(!this.convenio.selectAll.cidades)
          this.listaPolos = response.result;
      }
    });    
  }

  onBlurPolo(convenio: any) {
    convenio.polos.remove(0);
  }

  onSubmitFormConvenio(convenio: any) {
    if (!convenio.codTipoCurso) {
      this.toastr.warning("Favor selecionar o tipo de curso");
    } else if (!convenio.codFilial) {
      this.toastr.warning("Favor selecionar a unidade");
    } else if (!convenio.idPerLet) {
      this.toastr.warning("Favor selecionar o período letivo");
    } else if (convenio.cursos.length == 0) {
      this.toastr.warning("Favor selecionar ao menos um curso");
    } else if (convenio.bolsas.length == 0) {
      this.toastr.warning("Favor selecionar ao menos uma bolsa");
    } else {
      this.ConvenioService.ExisteConvenioPlanilhaPendente().subscribe((response: any) => {
        
        if(response.result) {
          Swal.fire({
            title: '<strong style="color:#ff5c00">Confirmação</strong>',
            text: 'Já existe uma planilha pendente de importação, se exportar essa planilha irá sobreescrever a anterior. Deseja continuar ?',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#ff5c00'
          }).then((result) => {
            if (result.isConfirmed) {

              this.NgxSpinnerService.show();

              this.ConvenioService.Exportar(convenio).subscribe((response: any) => {
                this.NgxSpinnerService.hide();
              
                let contentDisposition = response.headers.get('content-disposition');
              
                if (contentDisposition) {
                  let body = response.body;
                
                  let filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
                
                  saveAs(body, filename);
                } else {
                  this.toastr.error("Erro ao realizar download", null, {
                    disableTimeOut: true,
                  });
                }
              });
            }
          });
        } else{
          this.NgxSpinnerService.show();

          this.ConvenioService.Exportar(convenio).subscribe((response: any) => {
            this.NgxSpinnerService.hide();
          
            let contentDisposition = response.headers.get('content-disposition');
          
            if (contentDisposition) {
              let body = response.body;
            
              let filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
            
              saveAs(body, filename);
            } else {
              this.toastr.error("Erro ao realizar download", null, {
                disableTimeOut: true,
                
              });
            }
          });
        }
      });
    }
  }

  onSubmitFormPublicar(){
    Swal.fire({
      title: '<strong style="color:#ff5c00">Confirmação</strong>',
      text: 'Confirma a publicação dos Convênios ?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'NÃO',
      confirmButtonText: 'SIM',
      confirmButtonColor: '#ff5c00'
    }).then((result) => {
      if (result.isConfirmed) {

        this.NgxSpinnerService.show();

        this.ConvenioService.Publicar().subscribe((response: any) => {
          this.getExisteConvenioTemp();
          if(response.statusCode === 200){
            this.mensagemSucesso = "Publicação realizada com sucesso!";

            this.toastr.success(this.mensagemSucesso, null, {
              disableTimeOut: true,
            });
          } else {
            this.mensagemErro = "Ocorreu um erro ao tentar realizar a publicação. Tente novamente mais tarde";

            this.toastr.error(this.mensagemErro, null, {
              disableTimeOut: true,
            });
          }

          this.NgxSpinnerService.hide();          
        });
      }
    });
  }

  onChangeFile(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files.item(0);

      var fileName = document.getElementById('file-label');

      fileName.textContent = this.file.name;
    }
  }

  onSubmitFormFile(file: any) {
    if (!file) {
      this.toastr.warning("Favor selecionar um arquivo");
    } else {
      Swal.fire({
        title: '<strong style="color:#ff5c00">Confirmação</strong>',
        text: 'Deseja realmente importar esses convênios?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#ff5c00'
      }).then((result) => {
        if (result.isConfirmed) {
          this.NgxSpinnerService.show();

          this.ConvenioService.Importar(file).subscribe((response: any) => {
            this.getExisteConvenioTemp();
            this.NgxSpinnerService.hide();

            if (response.statusCode == 200) {
              this.mensagemSucesso = "Arquivo importado com sucesso!";

              this.toastr.success(this.mensagemSucesso, null, {
                disableTimeOut: true,
              });

              var fileName = document.getElementById('file-label');

              fileName.textContent = "Selecione um arquivo";

              this.file = null;
            } else {
              if (response.message) {
                this.mensagemErro = response.message;

                this.toastr.error(response.message, null, {
                  disableTimeOut: true,
                });
              } else {
                this.mensagemErro = "Erro ao realizar importação";

                this.toastr.error(this.mensagemErro, null, {
                  disableTimeOut: true,
                });
              }
            }
          });
        }
      });
    }
  }

  onChangeSelect(event: any, lista: any, nomeListaSelecionada: any, coluna: any) {

    if (event.target.index == 0) {
      if (event.target.selected) {
        this.convenio[nomeListaSelecionada] = [0];
        this.convenio.selectAll[nomeListaSelecionada] = true;
        this.convenio[nomeListaSelecionada] = this.convenio[nomeListaSelecionada].concat(lista.map(item => item[coluna]));
      } else {
        this.convenio[nomeListaSelecionada] = [];
        this.convenio.selectAll[nomeListaSelecionada] = false;
      }
    } else {
      this.convenio[nomeListaSelecionada].remove(0);
      this.convenio.selectAll[nomeListaSelecionada] = false;
      if (this.convenio[nomeListaSelecionada].length == lista.length) {
        this.convenio[nomeListaSelecionada] = [0];
        this.convenio.selectAll[nomeListaSelecionada] = true;
        this.convenio[nomeListaSelecionada] = this.convenio[nomeListaSelecionada].concat(lista.map(item => item[coluna]));
      }
    }
    console.log(nomeListaSelecionada + ": " + this.convenio.selectAll[nomeListaSelecionada]);

    let listaSelecionada = this.convenio[nomeListaSelecionada];

    $("#" + event.target.parentElement.id + " option").each(function () {
      $(this).prop('selected', false);

      if (listaSelecionada.filter(item => {
        return item == $(this)[0].id;
      }).length > 0) {
        $(this).prop('selected', true);
      }
    });
  }

  getExisteConvenioTemp() {
    this.ConvenioService.ExisteConvenioTemp().subscribe((response: any) => {
        
      if(response.statusCode === 200) {
        this.convenio.publicar = response.result;
      }else{
        this.convenio.publicar = false;
      }
    });
  }
}