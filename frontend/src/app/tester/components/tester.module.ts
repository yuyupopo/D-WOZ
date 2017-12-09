import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { TesterListComponent } from './tester-list/tester-list.component';
import { TesterDetailComponent } from './tester-detail/tester-detail.component';

import { CovalentLayoutModule, CovalentStepsModule, CovalentLoadingModule } from '@covalent/core';

export const COMPONENTS = [
    TesterListComponent,
    TesterDetailComponent,
];

const routes: Routes = [
    { path: '', component: TesterListComponent },
    { path: ':id', component: TesterDetailComponent },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    CovalentLayoutModule, CovalentStepsModule, CovalentLoadingModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class TesterModule {}
