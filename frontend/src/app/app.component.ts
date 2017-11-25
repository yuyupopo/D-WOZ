import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpeechService } from './service/speech.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  showSearchButton: boolean;
  speechData: string;

  constructor(private _speechService: SpeechService) {
    this.showSearchButton = true;
    this.speechData = '';
  }

  ngOnInit() {
    console.log('hello');
    if ('speechSynthesis' in window) {
      console.log('your browser support speech synthesis');
    }
  }

  ngOnDestroy() {
    this._speechService.DestroySpeechObject();
  }

  activateSpeechSearchMovie(): void {
    this.showSearchButton = false;

    this._speechService.record()
        .subscribe(
        // listener
        (value) => {
            this.speechData = value;
            console.log(value);
            let msg = new SpeechSynthesisUtterance();
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
        },
        // errror
        (err) => {
            console.log(err);
            if (err.error === 'no-speech') {
                console.log('--restatring service--');
                this.activateSpeechSearchMovie();
            }
        },
        // completion
        () => {
            this.showSearchButton = true;
            console.log('--complete--');
            this.activateSpeechSearchMovie();
        });
  }
}
