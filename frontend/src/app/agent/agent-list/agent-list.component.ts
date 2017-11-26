import { Component, OnInit } from '@angular/core';
import { Agent, Dialog, Trigger, Action, Behavior } from '../service';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromAgent from '../../state/reducers/agent-reducer';
import * as AgentAction from '../../state/actions/agent-action';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent implements OnInit {

  public agentList$: Observable<Agent[]>;

  selectedAgent: Agent = null;

  constructor(
    private _store: Store<fromAgent.AgentState>) {
    this.agentList$ = this._store.select(fromAgent.getAgentList);
    this._store.select(fromAgent.getAgentList).subscribe(response => {
      console.log('response', response);
    });
  }

  ngOnInit() {
    this._store.dispatch(new AgentAction.Load(null));
  }

  public isSelected(agent: Agent): boolean {
    if (this.selectedAgent) {
      return (this.selectedAgent.id === agent.id);
    } else {
      return false;
    }
  }

  public createAgent(): void {
    console.log(this.agentList$);
  }

}
