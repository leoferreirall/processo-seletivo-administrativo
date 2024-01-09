import { Component, OnInit } from '@angular/core';
import { IngressoService } from '@services/ingresso.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-enem-validation',
  templateUrl: './enem-validation.component.html',
  styleUrls: ['./enem-validation.component.scss']
})
export class EnemValidationComponent implements OnInit {
  id: any;
  enem: any = {};
  inscricao: any = {};

  constructor(private IngressoService: IngressoService,
    private toastr: ToastrService,
    private NgxSpinnerService: NgxSpinnerService,
    private ActivatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.ActivatedRoute.snapshot.paramMap.get("id");

    this.NgxSpinnerService.show();

    this.IngressoService.GetEnemById(this.id).subscribe((response: any) => {
      if (response.statusCode == 200 && response.result != null) {
        this.enem = response.result;

        this.IngressoService.GetInscricaoById(this.enem.codPsInscricao).subscribe((response: any) => {
          this.NgxSpinnerService.hide();

          if (response.statusCode == 200) {
            this.inscricao = response.result;
          }
          else if (response.statusCode == 400) {
            this.toastr.error(response.message);
          } else {
            this.toastr.warning(response.message);
          }
        });
      }
      else if (response.statusCode == 400) {
        this.NgxSpinnerService.hide();

        this.toastr.error(response.message);
      } else if (response.statusCode == 404) {
        this.NgxSpinnerService.hide();

        this.toastr.warning(response.message);
      }
      else {
        this.NgxSpinnerService.hide();

        this.toastr.warning("Nota não encontrada");
      }
    });
  }

  AprovarReprovar(enem, status: boolean) {
    enem.status = status;

    this.NgxSpinnerService.show();

    this.IngressoService.AprovarReprovarEnem(enem).subscribe((response: any) => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 200 && response.result != null) {
        this.enem = response.result;
      }
      else if (response.statusCode == 400) {
        this.toastr.error(response.message);
      }
      else {
        this.toastr.warning(response.message);
      }
    });
  }
}
