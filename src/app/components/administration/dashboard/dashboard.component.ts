import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { DashboardService } from '@services/dashboard.service';
import { IntegracaoService } from '@services/integracao.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;
declare var Chart: any;
declare var App: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  listaAtividades: [];
  listaStatus: [];

  totalAtividade: any = 0;

  COLORS = [
    '#007bff',
    '#ff0018',
    '#fd7e14',
    '#1ea53d',
    '#e83e8c',
    '#ffc107',
    '#6f42c1',
    '#20c997',
    '#17a2b8',
    '#6c757d',
    '#00b11e',
    '#343a40',
    '#00caca',
    '#003265',
    '#b5bec5',
    '#bc8f8f',
    '#adff2f',
    '#dc143c',
    '#0000cd',
    '#d2691e'
  ];

  constructor(private authService: AuthService,
    private dashboardService: DashboardService,
    private IntegracaoService: IntegracaoService,
    private Router: Router,
    private toastr: ToastrService,
    private NgxSpinnerService: NgxSpinnerService) {
  }

  ngOnInit(): void {
    App.initMainPage();

    Chart.pluginService.register({
      beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
          var ctx = chart.chart.ctx;
       
          var centerConfig = chart.config.options.elements.center;
          var fontStyle = centerConfig.fontStyle || 'Arial';
          var txt = centerConfig.text;
          var color = centerConfig.color || '#000';
          var sidePadding = centerConfig.sidePadding || 50;
          var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
          ctx.font = "20px " + fontStyle;
       
          var stringWidth = ctx.measureText(txt).width;
          var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;
  
          var widthRatio = elementWidth / stringWidth;
          var newFontSize = Math.floor(30 * widthRatio);
          var elementHeight = (chart.innerRadius * 2);
  
          var fontSizeToUse = Math.min(newFontSize, elementHeight);
  
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2) - 4;
          var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
          ctx.font = (fontSizeToUse - 20 ) +"px " + fontStyle;
          ctx.fillStyle = color;
       
          ctx.fillText(txt, centerX, centerY);
        }
      }
    });

    this.GetQtdIncricaoByAtividade();
    this.GetQtdStatusByAtividade();
  }

  GetQtdIncricaoByAtividade() {
    this.IntegracaoService.GetQtdIncricaoByAtividade().subscribe(response => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      this.listaAtividades = response.result;

      this.totalAtividade = this.listaAtividades.map((x: any) => x.qtd).reduce((x, i) => x + i, 0);

      setTimeout(() => {
        $('.knob').knob({
          'format' : function (value) {
             return Math.round(value) + '%';
          }
        });
      });

      var donutChartCanvas = $('#donutChart-atividades').get(0).getContext('2d');
      
      new Chart(donutChartCanvas, {
        type: 'doughnut',
        data: {
          labels: this.listaAtividades.map((x: any) => x.descricao),
          datasets: [
            {
              data: this.listaAtividades.map((x: any) => x.qtd),
              backgroundColor: this.COLORS
            }
          ]
        },
        options: {
          responsive: true,
          legend: { position: 'left' },
          title: { display: true, text: 'Quantidade de inscrições por atividade' },
          elements: {
            center: {
              text: this.totalAtividade,
              color: '#343a40'
            }
          }
        }
      });
    });
  }

  GetQtdStatusByAtividade() {
    this.IntegracaoService.GetQtdStatusByAtividade().subscribe(response => {
      this.NgxSpinnerService.hide();

      if (response.statusCode == 404) {
        this.toastr.warning(response.message);

        return;
      } else if (response.statusCode != 200) {
        this.toastr.error(response.message);

        return;
      }

      this.listaStatus = response.result;

      var donutChartCanvas = $('#donutChart-status').get(0).getContext('2d');

      new Chart(donutChartCanvas, {
        type: 'doughnut',
        data: {
          labels: this.listaStatus.map((x: any) => x.descricao),
          datasets: [
            {
              data: this.listaStatus.map((x: any) => x.qtd),
              backgroundColor: this.COLORS
            }
          ]
        },
        options: {
          responsive: true,
          legend: { position: 'left' },
          title: { display: true, text: 'Quantidade de inscrições por status' },
          elements: {
            center: {
              text: this.listaStatus.map((x: any) => x.qtd).reduce((x, i) => x + i, 0),
              color: '#343a40'
            }
          }
        }
      });
    });
  }
}