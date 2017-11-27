import { Component, OnInit } from '@angular/core';
import { Agent, Dialog, Trigger, Action, Behavior } from '../service';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { State } from '../../reducers/reducer';
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
    private _store: Store<State>) {
    this.agentList$ = this._store.select('agent').map(agentState => agentState.agentList);
    this._store.select('agent').subscribe(response => {
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
