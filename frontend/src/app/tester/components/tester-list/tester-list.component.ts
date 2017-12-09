import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Tester } from '../../model/tester';
import { Agent } from '../../../agent/model/agent';

import * as fromTester from '../../reducers/reducer';
import * as TesterAction from '../../actions/tester-action';
import * as RouterAction from '../../../shared/route/route-action';

@Component({
  selector: 'app-tester-list',
  templateUrl: './tester-list.component.html',
  styleUrls: ['./tester-list.component.css']
})
export class TesterListComponent implements OnInit {


    link = '';

    constructor(private _store: Store<fromTester.State>) { }

    ngOnInit() {

    }

    startTest() {
        this._store.dispatch(new TesterAction.Load(this.link));
        console.log('test start');
    }


}
