import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgModule, Compiler, COMPILER_OPTIONS, CompilerFactory, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from '@shared/navbar/navbar.component';
import { LayoutComponent } from '@shared/layout/layout.component';
import { SidebarComponent } from '@shared/sidebar/sidebar.component';
import { FooterComponent } from '@shared/footer/footer.component';
import { ContentHeaderComponent } from '@shared/content-header/content-header.component';
import { ItemMenuComponent } from '@shared/sidebar/item-menu/item-menu/item-menu.component';
import { OfferPlanComponent } from '@administration/offer-plan/offer-plan.component';
import { BankSlipComponent } from '@administration/bank-slip/bank-slip.component';
import { BankCardComponent } from '@administration/bank-card/bank-card.component';
import { ContractComponent } from '@administration/contract/contract.component';
import { GeneralDocumentsComponent } from '@administration/general-documents/general-documents.component';
import { CurriculumAnalysisComponent } from '@administration/curriculum-analysis/curriculum-analysis.component';
import { CurriculumAnalysisValidationComponent } from '@administration/curriculum-analysis/curriculum-analysis-validation/curriculum-analysis-validation.component';
import { CurriculumEvaluationComponent } from '@administration/curriculum-evaluation/curriculum-evaluation.component';
import { CurriculumEvaluationValidationComponent } from '@administration/curriculum-evaluation/curriculum-evaluation-validation/curriculum-evaluation-validation.component';
import { UniversityExamComponent } from '@administration/university-exam/university-exam.component';
import { UniversityExamCorretionComponent } from '@administration/university-exam/corretion/university-exam-corretion.component';
import { DashboardComponent } from '@administration/dashboard/dashboard.component';
import { SigninComponent } from '@authentication/signin/signin.component';
import { TokenInterceptorService } from '@token/token-interceptor.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from '@auth/auth.service';
import { environment } from '../environments/environment';
import { DataTablesModule } from 'angular-datatables';
import { PlanComponent } from '@administration/plan/plan.component';
import { PlanCreateComponent } from '@administration/plan/create/plan-create.component';
import { PlanEditComponent } from '@administration/plan/edit/plan-edit.component';
import { OfferComponent } from '@administration/offer/offer.component';
import { OfferImportComponent } from '@administration/offer-import/offer-import.component';
import { SubscriptionComponent } from '@administration/subscription/subscription.component';
import { IntegrationComponent } from '@administration/subscription/integration/integration.component';
import { ScholarshipImportComponent } from '@administration/scholarship-import/scholarship-import.component';
import { BaseComponent } from './components/base.component';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
import { NgxSpinnerModule } from "ngx-spinner";
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ConfigComponent } from '@administration/config/config.component';
import { ConfigEditComponent } from '@administration/config/edit/config-edit.component';
import { ConfigCreateComponent } from '@administration/config/create/config-create.component';
import { EnemComponent } from '@administration/enem/enem.component';
import { EnemValidationComponent } from '@administration/enem/enem-validation/enem-validation.component';
import { PsImportComponent } from '@administration/ps-import/ps-import.component';
import { ProcessoSeletivoComponent } from '@administration/processo-seletivo/processo-seletivo.component';
import { RequirementComponent } from '@administration/requirement/requirement.component';
import { ReportComponent } from './components/administration/report/report.component';
import { CanvasCorretionComponent } from '@administration/canvas-corretion/canvas-corretion.component';
import { NgxMaskModule } from 'ngx-mask';
import { TrilhaComponent } from '@administration/trilha/trilha.component';
import { ReportGeralComponent } from '@administration/report-geral/report-geral.component';
import { OfferPoleComponent } from './components/administration/offer-pole/offer-pole.component';
import { RegistrationChangeComponent } from '@administration/registration-change/registration-change.component';
import { DocumentAnalysisValidationComponent } from './components/administration/document-analysis/document-analysis-validation/document-analysis-validation.component';
import { DocumentAnalysisComponent } from '@administration/document-analysis/document-analysis.component';
import { ContractEditionComponent } from './components/administration/contract-edition/contract-edition.component';
import { QuillModule } from 'ngx-quill';
import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';
import { AllocationPlanComponent } from '@administration/allocation-plan/allocation-plan.component';
import { CPFPipe } from './Pipes/cpf/cpf.pipe';
import { AcessoCandidatoComponent } from '@administration/acesso-candidato/acesso-candidato.component';
import { ConsultadePlanosComponent } from '@administration/consulta-de-planos/consulta-de-planos/consulta-de-planos';

registerLocaleData(localeBr, 'pt');

export function compilerFactory() {
  return new JitCompilerFactory().createCompiler()
}

export function createCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler();
}

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    NavbarComponent,
    LayoutComponent,
    SidebarComponent,
    FooterComponent,
    ContentHeaderComponent,
    ItemMenuComponent,
    OfferPlanComponent,
    BankSlipComponent,
    BankCardComponent,
    ContractComponent,
    GeneralDocumentsComponent,
    CurriculumAnalysisComponent,
    CurriculumAnalysisValidationComponent,
    CurriculumEvaluationComponent,
    CurriculumEvaluationValidationComponent,
    UniversityExamComponent,
    UniversityExamCorretionComponent,
    SigninComponent,
    DashboardComponent,
    PlanComponent,
    PlanCreateComponent,
    PlanEditComponent,
    OfferComponent,
    OfferImportComponent,
    PsImportComponent,
    OfferPlanComponent,
    ScholarshipImportComponent,
    SubscriptionComponent,
    IntegrationComponent,
    ConfigComponent,
    ConfigCreateComponent,
    ConfigEditComponent,
    EnemComponent,
    EnemValidationComponent,
    ProcessoSeletivoComponent,
    ReportComponent,
    CanvasCorretionComponent,
    TrilhaComponent,
    ReportGeralComponent,
    RequirementComponent,
    OfferPoleComponent,
    RegistrationChangeComponent,
    DocumentAnalysisComponent,
    DocumentAnalysisValidationComponent,
    ContractEditionComponent,
    AllocationPlanComponent,
    CPFPipe,
    AcessoCandidatoComponent,
    ConsultadePlanosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DataTablesModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    NgxMaskModule.forRoot(),
    QuillModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    TokenInterceptorService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
