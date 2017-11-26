import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentListComponent } from './agent-list/agent-list.component';
import { AgentDetailComponent } from './agent-detail/agent-detail.component';
import { AgentEditComponent } from './agent-edit/agent-edit.component';
import { AgentCreateComponent } from './agent-create/agent-create.component';

import { AgentService } from '../service/agent.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AgentListComponent,
    AgentDetailComponent,
    AgentEditComponent,
    AgentCreateComponent,
  ],
  providers: [
    AgentService
  ]
})
export class AgentModule { }
