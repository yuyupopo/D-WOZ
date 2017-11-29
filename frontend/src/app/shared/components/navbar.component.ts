import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../shared/reducer';
import * as fromRoute from '../../shared/route/route-action';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    isLoggedIn: Observable<boolean>;

    constructor(private _store: Store<fromRoot.State>) {
        this.isLoggedIn = this._store.select(fromRoot.getUserState).map(userState => userState.user !== null);
    }

    ngOnInit() { }

    public logout(): void {
        this._store.dispatch(new fromRoute.GoByUrl('/signin'));
    }
}
