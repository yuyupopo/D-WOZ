import { Experiment } from './experiment';
export class Agent {
  id: number;
  name: string;
  dialogs: Array<Dialog>;
  explanation: string;
  experiments: Array<Experiment>;

  constructor(
    id: number,
    name: string,
    dialogs: Array<Dialog> = [],
    explanation: string = '',
    experiments: Array<Experiment> = [],
  ) {
    this.id = id;
    this.name = name;
    this.dialogs = dialogs;
    this.explanation = explanation;
    this.experiments = experiments;
  }
}

export class Dialog {
  id: number;
  trigger: Trigger;
  action: Action;
  behaviors: Array<Behavior>;

  constructor(
    id: number,
    trigger: Trigger,
    action: Action,
    behaviors: Array<Behavior> = []) {
      this.id = id;
      this.trigger = trigger;
      this.action = action;
      this.behaviors = behaviors;
  }
}

export class Behavior {
  id: number;
  behavior: string;
  nextDialog: Dialog;

  constructor(id: number, behavior: string, nextDialog: Dialog) {
    this.id = id;
    this.behavior = behavior;
    this.nextDialog = nextDialog;
  }
}

export class Trigger {
  listenTrigger: string;

  constructor(listenTrigger: string) {
    this.listenTrigger = listenTrigger;
  }
}

export class Action {
  talkAction: string;

  constructor(talkAction: string) {
    this.talkAction = talkAction;
  }
}
