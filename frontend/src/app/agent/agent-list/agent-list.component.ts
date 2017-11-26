import { Component, OnInit } from '@angular/core';
import { Agent, Dialog, Trigger, Action, Behavior } from '../service';

import { AgentService } from '../service';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent implements OnInit {

  public agentList: Array<Agent> = [];

  selectedAgent: Agent = null;

  constructor(
    private _agentService: AgentService
  ) { }

  ngOnInit() {
    this._agentService.getAgentList().then((agentList) => {
      this.agentList = agentList;
    });
  }

  public isSelected(agent: Agent): boolean {
    if (this.selectedAgent) {
      return (this.selectedAgent.id === agent.id);
    } else {
      return false;
    }
  }

  public createAgent(): void {

  }

}
