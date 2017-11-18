import { Component, OnInit } from '@angular/core';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-alarm-page',
  templateUrl: './alarm-page.component.html',
  styleUrls: ['./alarm-page.component.css']
})
export class AlarmPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}

export { AlertService };
