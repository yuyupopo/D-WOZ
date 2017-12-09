import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../../shared/reducer';
import * as fromUser from '../../../user/actions/user-action';
import * as fromRoute from '../../route/route-action';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    isLoggedIn: Observable<boolean>;

    constructor(private _store: Store<fromRoot.State>) {
        this.isLoggedIn = this._store.select(fromRoot.getUserState).map(userState => userState.signedIn);
    }

    ngOnInit() { }

    public signout(): void {
        this._store.dispatch(new fromUser.SignOut());
    }

    public gotoAgent(): void {
        this._store.dispatch(new fromRoute.GoByUrl('agents'));
    }

    public gotoExperiment(): void {
        this._store.dispatch(new fromRoute.GoByUrl('experiments'));
    }

    public gotoTesters(): void {
        this._store.dispatch(new fromRoute.GoByUrl('testers'));
    }
}
