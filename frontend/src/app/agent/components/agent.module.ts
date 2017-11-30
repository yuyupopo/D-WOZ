import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AgentListComponent } from './agent-list/agent-list.component';
import { AgentDetailComponent } from './agent-detail/agent-detail.component';
import { AgentEditComponent } from './agent-edit/agent-edit.component';
import { AgentCreateComponent } from './agent-create/agent-create.component';

import { RouterModule, Routes } from '@angular/router';

import { AccordionModule } from 'ngx-bootstrap/accordion';

export const COMPONENTS = [

];

const routes: Routes = [
    {path: '', component: AgentListComponent},
    {path: 'create', component: AgentCreateComponent},
    {path: ':id', component: AgentDetailComponent},
    {path: ':id/edit', component: AgentEditComponent},
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    AccordionModule.forRoot(),
  ],
  declarations: [
    AgentCreateComponent,
    AgentDetailComponent,
    AgentListComponent,
    AgentEditComponent,
    ],
  exports: [
    AgentCreateComponent,
    AgentDetailComponent,
    AgentListComponent,
    AgentEditComponent,
  ],
})
export class AgentModule {}
