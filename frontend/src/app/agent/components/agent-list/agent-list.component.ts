import { Component, OnInit } from '@angular/core';
import { Agent, Dialog, Trigger, Action, Behavior } from '../service';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromAgent from '../../reducers/reducer';
import * as AgentAction from '../../actions/agent-action';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent implements OnInit {

  public agentList$: Observable<Agent[]>;

  selectedAgent: Agent = null;

  constructor(
    private _store: Store<fromAgent.State>) {
    this.agentList$ = this._store.select(fromAgent.getAgentList);
    this._store.select(fromAgent.getAgentState).subscribe(response => {
      console.log('response', response);
    });
    console.log('agent-list created');
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
