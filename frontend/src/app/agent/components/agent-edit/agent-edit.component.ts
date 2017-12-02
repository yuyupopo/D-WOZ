import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Agent, Dialog, Trigger, Action, Behavior } from '../service';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromAgent from '../../reducers/reducer';
import * as AgentAction from '../../actions/agent-action';
import * as RouterAction from '../../../shared/route/route-action';

import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-agent-edit',
  templateUrl: './agent-edit.component.html',
  styleUrls: ['./agent-edit.component.css']
})
export class AgentEditComponent implements OnInit, OnDestroy {

    agent: Agent = null;
    subscription: ISubscription;

    constructor(private _store: Store<fromAgent.State>) { }

    ngOnInit() {
        this.subscription = this._store.select(fromAgent.getSelectedAgent).subscribe(agent => {
            console.log('agent edit');
            this.agent = agent;
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
