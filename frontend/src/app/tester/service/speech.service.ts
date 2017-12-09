import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';

import { Store } from '@ngrx/store';
import { Headers, Http } from '@angular/http';

import * as fromTester from '../reducers/reducer';
import * as TesterAction from '../actions/tester-action';

interface IWindow extends Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
}
@Injectable()
export class SpeechService {
    speechRecognition: any;

    constructor(private zone: NgZone,
        private _store: Store<fromTester.State>) {
    }

    record(): Observable<string> {

        return Observable.create(observer => {
            const { webkitSpeechRecognition }: IWindow = <IWindow>window;
            this.speechRecognition = new webkitSpeechRecognition();
            this.speechRecognition.continuous = true;
            this.speechRecognition.interimResults = true;
            this.speechRecognition.lang = 'ko';
            this.speechRecognition.maxAlternatives = 2;

            this.speechRecognition.onresult = speech => {
                let term = '';
                if (speech.results) {
                    const result = speech.results[speech.resultIndex];
                    const transcript = result[0].transcript;
                    if (result.isFinal) {
                        this.speechRecognition.stop();
                        if (result[0].confidence < 0.3) {
                            console.log('Unrecognized result - Please try again');
                        } else {
                            term = _.trim(transcript);
                            console.log('Did you said? -> ' + term + ' , If not then say something else...');
                        }
                        this._store.dispatch(new TesterAction.ListenStop(term));
                        this.speechRecognition.abort();
                    }
                }
                this.zone.run(() => {
                    observer.next(term);
                });
            };

            this.speechRecognition.onerror = error => {
                observer.error(error);
            };

            this.speechRecognition.onend = () => {
                observer.complete();
            };

            this.speechRecognition.start();
            console.log('Say something - We are listening !!!');
        });
    }
    activateSpeech(): void {
        console.log('activate speech');

        this.record().subscribe(
            // listener
            (value) => {
                console.log(value);
            },
            // errror
            (err) => {
                console.log(err);
                if (err.error === 'no-speech') {
                    console.log('--restarting service--');
                    this.activateSpeech();
                }
            },
            // completion
            () => {
                console.log('--complete--');
            });
      }

    public talk (value: string): void {
        const msg = new SpeechSynthesisUtterance();
        // Set the text.
        msg.text = value;
       // Set the attributes.
        msg.lang = 'ko';
       // msg.voice = 'native'; msg.voice = 'Google US English'; //  'Google UK English Female'
        // msg.voice = 'Yuna;
        msg.volume = 1;
        msg.rate = 1;
        msg.pitch = 1;
       //  msg.onend = function(event) { console.log('Speech complete'); }
        // Queue this utterance.
        (<any>window).speechSynthesis.speak(msg);
        console.log('Speech complete');
        this._store.dispatch(new TesterAction.SpeakStop());
        // msg.onend = (event) => {
        //     console.log('Speech complete');
        //     this._store.dispatch(new TesterAction.SpeakStop());
        // };
    }

    DestroySpeechObject() {
        if (this.speechRecognition) {
            this.speechRecognition.stop();
        }
    }

}
