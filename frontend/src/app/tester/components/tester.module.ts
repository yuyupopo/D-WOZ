import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { TesterListComponent } from './tester-list/tester-list.component';
import { TesterDetailComponent } from './tester-detail/tester-detail.component';


export const COMPONENTS = [
    TesterListComponent,
    TesterDetailComponent,
];

const routes: Routes = [
    { path: '', component: TesterListComponent },
    { path: '', component: TesterDetailComponent },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class TesterModule {}
