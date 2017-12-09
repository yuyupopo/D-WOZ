import { Component, OnInit } from '@angular/core';
import { Agent, Dialog, Trigger, Behavior } from '../service';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromAgent from '../../reducers/reducer';
import * as AgentAction from '../../actions/agent-action';
import * as RouterAction from '../../../shared/route/route-action';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent implements OnInit {

    public agentList$: Observable<Agent[]>;
    public selectedAgent: Agent;

    constructor(
        private _store: Store<fromAgent.State>) {
        this.agentList$ = this._store.select(fromAgent.getAgentList);
        this._store.select(fromAgent.getSelectedAgent).subscribe(agent => {
            this.selectedAgent = agent;
        });
        console.log('agent-list created');
    }

    ngOnInit() {
        this._store.dispatch(new AgentAction.Load(null));
    }

    public selectAgent(agent: Agent): void {
        this._store.dispatch(new AgentAction.Select(agent));
        // this._store.dispatch(new AgentAction.LoadAgent(agent.id));
    }

    public isSelected(agent: Agent): boolean {
        if (this.selectedAgent) {
        return (this.selectedAgent.id === agent.id);
        } else {
        return false;
        }
    }

    public createAgent(): void {
        this._store.dispatch(new RouterAction.GoByUrl('agents/create'));
    }

    public editAgent(agent: Agent): void {
        this._store.dispatch(new RouterAction.GoByUrl(`agents/${agent.id}/edit`));
    }

}
