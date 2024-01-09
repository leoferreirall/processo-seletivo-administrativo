import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { OfferPlanComponent } from '@administration/offer-plan/offer-plan.component';
import { BankSlipComponent } from '@administration/bank-slip/bank-slip.component';
import { BankCardComponent } from '@administration/bank-card/bank-card.component';
import { ContractComponent } from '@administration/contract/contract.component';
import { GeneralDocumentsComponent } from '@administration/general-documents/general-documents.component';
import { CurriculumAnalysisComponent } from '@administration/curriculum-analysis/curriculum-analysis.component';
import { CurriculumEvaluationComponent } from '@administration/curriculum-evaluation/curriculum-evaluation.component';
import { UniversityExamComponent } from '@administration/university-exam/university-exam.component';
import { DashboardComponent } from '@administration/dashboard/dashboard.component';
import { SigninComponent } from '@authentication/signin/signin.component';
import { LayoutComponent } from '@shared/layout/layout.component';
import { PlanComponent } from '@administration/plan/plan.component';
import { PlanCreateComponent } from '@administration/plan/create/plan-create.component';
import { PlanEditComponent } from '@administration/plan/edit/plan-edit.component';
import { OfferComponent } from '@administration/offer/offer.component';
import { OfferImportComponent } from '@administration/offer-import/offer-import.component';
import { UniversityExamCorretionComponent } from '@administration/university-exam/corretion/university-exam-corretion.component';
import { SubscriptionComponent } from '@administration/subscription/subscription.component';
import { IntegrationComponent } from '@administration/subscription/integration/integration.component';
import { ScholarshipImportComponent } from '@administration/scholarship-import/scholarship-import.component';
import { ConfigComponent } from '@administration/config/config.component';
import { EnemComponent } from '@administration/enem/enem.component';
import { EnemValidationComponent } from '@administration/enem/enem-validation/enem-validation.component';
import { CurriculumAnalysisValidationComponent } from '@administration/curriculum-analysis/curriculum-analysis-validation/curriculum-analysis-validation.component';
import { CurriculumEvaluationValidationComponent } from '@administration/curriculum-evaluation/curriculum-evaluation-validation/curriculum-evaluation-validation.component';
import { PsImportComponent } from '@administration/ps-import/ps-import.component';
import { ProcessoSeletivoComponent } from '@administration/processo-seletivo/processo-seletivo.component';
import { ReportComponent } from '@administration/report/report.component';
import { CanvasCorretionComponent } from '@administration/canvas-corretion/canvas-corretion.component';
import { TrilhaComponent } from '@administration/trilha/trilha.component';
import { ReportGeralComponent } from '@administration/report-geral/report-geral.component';
import { RequirementComponent } from '@administration/requirement/requirement.component';
import { OfferPoleComponent } from '@administration/offer-pole/offer-pole.component';
import { RegistrationChangeComponent } from '@administration/registration-change/registration-change.component';
import { DocumentAnalysisComponent } from '@administration/document-analysis/document-analysis.component';
import { DocumentAnalysisValidationComponent } from '@administration/document-analysis/document-analysis-validation/document-analysis-validation.component';
import { ContractEditionComponent } from '@administration/contract-edition/contract-edition.component';
import { AllocationPlanComponent } from '@administration/allocation-plan/allocation-plan.component';
import { AcessoCandidatoComponent } from '@administration/acesso-candidato/acesso-candidato.component';
import { ConsultadePlanosComponent } from '@administration/consulta-de-planos/consulta-de-planos/consulta-de-planos';

const routes: Routes = [
  {
    path: 'acesso-ao-painel',
    component: SigninComponent
  },
  {
    path: '',
    redirectTo: 'administrativo/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'administrativo',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'relatorio',
        children: [
          {
            path: 'report',
            children: [
              {
                path: '',
                component: ReportComponent
              },
              {
                path: 'trilha/:id',
                component: TrilhaComponent
              }
            ]
          },
          {
            path: 'report-geral',
            children: [
              {
                path: '',
                component: ReportGeralComponent
              }
            ]
          }
        ]
      },
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full'
          },
          {
            path: 'home',
            component: DashboardComponent
          },
          {
            path: 'inscricoes',
            children: [
              {
                path: '',
                component: SubscriptionComponent
              },
              {
                path: 'integracao/:id',
                component: IntegrationComponent
              }
            ]
          }
        ]
      },
      {
        path: 'campanha',
        children: [
          {
            path: '',
            redirectTo: 'planos',
            pathMatch: 'full'
          },
          {
            path: 'planos',
            children: [
              {
                path: '',
                component: PlanComponent
              },
              {
                path: 'create',
                component: PlanCreateComponent
              },
              {
                path: 'edit/:id',
                component: PlanEditComponent
              }
            ]
          },
          {
            path: 'ofertas',
            component: OfferComponent
          },
          {
            path: 'ofertas-polo',
            component: OfferPoleComponent
          },
          {
            path: 'ofertas-importacao',
            component: OfferImportComponent
          },
          {
            path: 'plano-ofertas',
            component: OfferPlanComponent
          },
          {
            path: 'bolsas-importacao',
            component: ScholarshipImportComponent
          },
          {
            path: 'ps-importacao',
            component: PsImportComponent
          },
          {
            path: 'processo-seletivo',
            component: ProcessoSeletivoComponent
          },
          {
            path: 'requisitos',
            component: RequirementComponent
          },
          {
            path: 'edicao-contrato',
            component: ContractEditionComponent
          },
          {
            path: 'alocacao-plano',
            component: AllocationPlanComponent
          },
          {
            path: 'teste-paulo',
            component: ConsultadePlanosComponent
          }
        ]
      },
      {
        path: 'cobranca',
        children: [
          {
            path: '',
            component: DashboardComponent
          },
          {
            path: 'baixa-manual',
            component: BankSlipComponent
          },
          {
            path: 'configuracao',
            component: ConfigComponent
          }
        ]
      },
      {
        path: 'contratos',
        component: ContractComponent
      },
      {
        path: 'documentos-gerais',
        component: GeneralDocumentsComponent
      },
      {
        path: 'analise-curricular',
        children: [
          {
            path: '',
            component: CurriculumAnalysisComponent
          },
          {
            path: ':id',
            component: CurriculumAnalysisValidationComponent
          }
        ]
      },
      {
        path: 'avaliacao-curricular',
        children: [
          {
            path: '',
            component: CurriculumEvaluationComponent
          },
          {
            path: ':id',
            component: CurriculumEvaluationValidationComponent
          }
        ]
      },
      {
        path: 'analise-documento',
        children: [
          {
            path: '',
            component: DocumentAnalysisComponent
          },
          {
            path: ':id',
            component: DocumentAnalysisValidationComponent
          }
        ]
      },
      {
        path: 'provas',
        children: [
          {
            path: '',
            component: UniversityExamComponent
          },
          {
            path: ':id',
            component: UniversityExamCorretionComponent
          }
        ]
      },
      {
        path: 'enem',
        children: [
          {
            path: '',
            component: EnemComponent
          },
          {
            path: ':id',
            component: EnemValidationComponent
          }
        ]
      },
      {
        path: 'correcao-canvas',
        children: [
          {
            path: '',
            component: CanvasCorretionComponent
          }
        ]
      },
      {
        path: 'atendimento',
        children: [
          {
            path: '',
            component: RegistrationChangeComponent
          }
        ]
      },
      {
        path: 'acesso-candidato',
        children: [
          {
            path: '',
            component: AcessoCandidatoComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
