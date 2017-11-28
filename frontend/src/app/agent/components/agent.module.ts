import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AgentListComponent } from './agent-list/agent-list.component';
import { AgentDetailComponent } from './agent-detail/agent-detail.component';
import { AgentEditComponent } from './agent-edit/agent-edit.component';
import { AgentCreateComponent } from './agent-create/agent-create.component';

import { RouterModule, Routes } from '@angular/router';

export const COMPONENTS = [
  AgentCreateComponent,
  AgentDetailComponent,
  AgentListComponent,
  AgentEditComponent,
];

const routes: Routes = [
    {path: '', component: AgentListComponent}
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    RouterModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class AgentModule {}
