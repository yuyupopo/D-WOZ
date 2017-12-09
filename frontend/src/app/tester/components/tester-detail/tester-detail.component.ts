import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Tester } from '../../model/tester';
import { Agent } from '../../../agent/model/agent';

import { TestStep } from '../../reducers/tester-reducer';

import * as fromTester from '../../reducers/reducer';
import * as TesterAction from '../../actions/tester-action';
import * as RouterAction from '../../../shared/route/route-action';

@Component({
  selector: 'app-tester-detail',
  templateUrl: './tester-detail.component.html',
  styleUrls: ['./tester-detail.component.css']
})
export class TesterDetailComponent implements OnInit {


    testStep = TestStep;

    step$: Observable<TestStep>;

    constructor(private _store: Store<fromTester.State>) { }

    ngOnInit() {
        this.step$ = this._store.select(fromTester.getStep);
    }

    nextStep() {
        this._store.dispatch(new TesterAction.Next());
    }

}
