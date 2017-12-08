import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


import { ExperimentListComponent } from './experiment-list/experiment-list.component';
import { ExperimentCreateComponent } from './experiment-create/experiment-create.component';
import { ExperimentDetailComponent } from './experiment-detail/experiment-detail.component';
import { ExperimentAnalysisComponent } from './experiment-analysis/experiment-analysis.component';
import { ExperimentEditComponent } from './experiment-edit/experiment-edit.component';
import { ExperimentTestComponent } from './experiment-test/experiment-test.component';

import { CovalentLayoutModule, CovalentStepsModule, CovalentLoadingModule } from '@covalent/core';
import { TdLoadingService } from '@covalent/core';

export const COMPONENTS = [
    ExperimentListComponent,
    ExperimentCreateComponent,
    ExperimentDetailComponent,
    ExperimentAnalysisComponent,
    ExperimentEditComponent,
    ExperimentTestComponent,
];

const routes: Routes = [
    { path: '', component: ExperimentListComponent },
    { path: 'create', component: ExperimentCreateComponent },
    { path: ':id', component: ExperimentDetailComponent },
    { path: ':id/analysis', component: ExperimentAnalysisComponent },
    { path: ':id/edit', component: ExperimentEditComponent },
    { path: ':id/test', component: ExperimentTestComponent },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CovalentStepsModule,
    CovalentLayoutModule,
    CovalentLoadingModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: []
})
export class ExperimentModule {}
