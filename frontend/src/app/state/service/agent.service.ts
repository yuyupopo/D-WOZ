import { Injectable } from '@angular/core';

import { Agent, Dialog, Behavior, Trigger, ListenTrigger, Action, TalkAction } from '../model/agent';

import { MockActionList, MockBehaviorList, MockAgentList, MockDialogList, MockTriggerList } from '../model/agent.mock';

@Injectable()
export class AgentService {

  constructor() { }

  public getTriggerList(): Promise<Array<Trigger>> {
    return Promise.resolve(MockTriggerList);
  }

  public getAgentList(): Promise<Array<Agent>> {
    return Promise.resolve(MockAgentList);
  }

}
