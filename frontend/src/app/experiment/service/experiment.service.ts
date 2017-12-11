import { Injectable, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { ServerSocket } from './../../shared/service/websocket.service';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { Headers, Http } from '@angular/http';

import * as fromExperiment from '../reducers/reducer';
import * as ExperimentAction from '../actions/experiment-action';

@Injectable()
export class ExperimentService implements OnDestroy {
    private socketSubscription: Subscription;

    constructor(
            private _store: Store<fromExperiment.State>,
            private _socket: ServerSocket,
            private _http: Http)  {
        const stream = this._socket.connect();
        console.log('stream', stream);
        this.socketSubscription = stream.subscribe(message => {
                console.log('received from server: ', message);
                this.channelMessageHandler(message);
        });
    }

    public startSupervision(experiment_id: number): void {
        const message = {
            'header': 'start_supervision',
            'body': {'experiment_id': experiment_id}};
        console.log('start supervision');
        this._socket.send(message);
    }

    public sendDiscipline(discipline: string): void {
        const message = {
            'header': 'send_discipline',
            'body': {'discipline': discipline}};
        console.log('send_discipline');
        this._socket.send(message);
    }

    public interupt(interrupt: string): void {
        const message = {
            'header': 'interrupt',
            'body': {'interrupt': interrupt}};
        console.log('interrupt');
        this._socket.send(message);
    }


    ngOnDestroy() {
        this.socketSubscription.unsubscribe();
    }

    channelMessageHandler(msg) {
        const data = msg;
        const command = data.header;
        const accept = data.accept;
        const body = data.body;

        if (command === 'start_supervision') {
            if (accept === 'True') {
                console.log('received start_supervision success', body);
                // this._store.dispatch(new ExperimentAction.StartSuccess(body));
            } else {
                console.log('received start_supervision fail');
                // this._store.dispatch(new ExperimentAction.StartFail(body));
            }
        } else if (command === 'start_experiment') {
            if (accept === 'True') {
                console.log('received start_experiment success', body);
                this._store.dispatch(new ExperimentAction.TestStart(body));
            } else {
                console.log('received start_experiment fail');
                // this._store.dispatch(new ExperimentAction.StartFail(body));
            }
        } else if (command === 'send_action') {
            if (accept === 'True') {
                console.log('received send_action success', body);
                this._store.dispatch(new ExperimentAction.TestResponseSucess(body));
            } else {
                console.log('received send action fail', body);
                this._store.dispatch(new ExperimentAction.TestResponseFail(body));
            }
        }
    }
}
