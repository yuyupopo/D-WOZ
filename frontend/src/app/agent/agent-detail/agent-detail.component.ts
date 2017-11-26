import { Component, OnInit, Input } from '@angular/core';
import { Agent, Dialog, Trigger, Action, Behavior } from '../service';


@Component({
  selector: 'app-agent-detail',
  templateUrl: './agent-detail.component.html',
  styleUrls: ['./agent-detail.component.css']
})
export class AgentDetailComponent implements OnInit {

  @Input() agent: Agent;

  constructor() { }

  ngOnInit() {
  }

}
