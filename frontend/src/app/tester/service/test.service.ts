import { Injectable, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { ServerSocket } from './../../shared/service/websocket.service';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { Headers, Http } from '@angular/http';

import * as fromTester from '../reducers/reducer';
import * as TesterAction from '../actions/tester-action';

@Injectable()
export class TestService implements OnDestroy {
    private socketSubscription: Subscription;

    constructor(
            private _store: Store<fromTester.State>,
            private _socket: ServerSocket,
            private _http: Http)  {
        const stream = this._socket.connect();
        console.log('stream', stream);
        this.socketSubscription = stream.subscribe(message => {
                console.log('received from server: ', message);
                this.channelMessageHandler(message);
        });
    }

    public startExperiment(experimentId: number): void {
        const message = {
            'header': 'start_experiment',
            'body': {'experiment_id': experimentId}};
        console.log('start experiment');
        this._socket.send(message);
    }

    public getExperimentInstruction(): void {
        const m = {'header': 'get_experiment_instruction',
                'body': {}};
        console.log('get experiment instruction');
        this._socket.send(m);
    }

    public getExperimentScenario(): void {
        const m = {'header': 'get_experiment_scenario',
                'body': {}};
        console.log('get experiment scenario');
        this._socket.send(m);
    }

    public sendTrigger(trigger: string): void {
        const m = {'header': 'send_trigger',
                'body': {'trigger': trigger}};
        console.log('send trigger');
        this._socket.send(m);
    }

    public sendBehavior(behavior: string): void {
        const m = {'header': 'send_behavior',
                'body': {'behavior': behavior}};
        console.log('send behavior');
        this._socket.send(m);
    }


    ngOnDestroy() {
        this.socketSubscription.unsubscribe();
    }

    channelMessageHandler(msg) {
        const data = msg;
        const command = data.header;
        const accept = data.accept;
        const body = data.body;

        if (command === 'start_experiment') {
            if (accept === 'True') {
                console.log('received start_experiment success', body);
                this._store.dispatch(new TesterAction.StartSuccess(body));
            } else {
                console.log('received start_experiment fail');
                this._store.dispatch(new TesterAction.StartFail(body));
            }
        } else if (command === 'send_action') {
            if (accept === 'True') {
                console.log('received send_action success', body);
                this._store.dispatch(new TesterAction.ListenSuccess(body));
            } else {
                console.log('received send action fail', body);
                this._store.dispatch(new TesterAction.ListenFail(body));
            }
        }
    }
}
