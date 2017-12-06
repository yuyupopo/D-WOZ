import { Component, OnInit, Input } from '@angular/core';
import { Agent, Dialog, Trigger, Behavior } from '../service';

import { AccordionModule, AccordionComponent } from 'ngx-bootstrap';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromAgent from '../../reducers/reducer';
import * as AgentAction from '../../actions/agent-action';
import * as RouterAction from '../../../shared/route/route-action';

@Component({
  selector: 'app-agent-detail',
  templateUrl: './agent-detail.component.html',
  styleUrls: ['./agent-detail.component.css']
})
export class AgentDetailComponent implements OnInit {

  @Input() agent: Agent;
  triggers: Trigger[];
  dialogs: Dialog[];
  behaviors: Behavior[];

  constructor(private _store: Store<fromAgent.State>) {
        this._store.select(fromAgent.getAgentState).subscribe(agent => {
            this.triggers = agent.triggerList;
        });

        this._store.select(fromAgent.getAgentState).subscribe(agent => {
            this.dialogs = agent.dialogList;
        });

        this._store.select(fromAgent.getAgentState).subscribe(agent => {
            this.behaviors = agent.behaviorList;
        });
  }

  ngOnInit() {
  }

  getTrigger(id: number): Trigger {
        for (const trigger of this.triggers) {
            if (trigger.id === id) {
                return trigger;
            }
        }
        return null;
    }

    getBehavior(id: number): Behavior {
        for (const behavior of this.behaviors) {
            if (behavior.id === id) {
                return behavior;
            }
        }
        return null;
    }

    getDialog(id: number): Dialog {
        for (const dialog of this.dialogs) {
            if (dialog.id === id) {
                return dialog;
            }
        }
        return null;
    }

}
