import { Experiment } from './experiment';
export class Agent {
  id: number;
  name: string;
  triggers: Array<Trigger>;
  explanation: string;
  experiments: Array<Experiment>;

  constructor(
    id: number,
    name: string,
    triggers: Array<Trigger> = [],
    explanation: string = '',
    experiments: Array<Experiment> = [],
  ) {
    this.id = id;
    this.name = name;
    this.triggers = triggers;
    this.explanation = explanation;
    this.experiments = experiments;
  }
}

export interface Trigger {
  id: number;
  trigger: string;
  nextDialog: Dialog;
  toString(): string;
}

export class ListenTrigger implements Trigger {
  public id: number;
  public trigger: string;
  nextDialog: Dialog;

  constructor(id: number, listenTrigger: string, nextDialog: Dialog) {
    this.id = id;
    this.trigger = listenTrigger;
    this.nextDialog = nextDialog;
  }

  toString(): string {
    return this.trigger;
  }
}

export class Dialog {
  id: number;
  action: Action;
  behaviors: Array<Behavior>;

  constructor(
    id: number,
    action: Action,
    behaviors: Array<Behavior> = []) {
      this.id = id;
      this.action = action;
      this.behaviors = behaviors;
  }
}

export class Behavior {
  id: number;
  behavior: string;
  nextDialog: Dialog;

  constructor(id: number, behavior: string, nextDialog: Dialog = null) {
    this.id = id;
    this.behavior = behavior;
    this.nextDialog = nextDialog;
  }
}


export interface Action {
  id: number;
  action: string;
  toString(): string;
}

export class TalkAction implements Action {
  public id: number;
  public action: string;

  constructor(id: number, talkAction: string) {
    this.id = id;
    this.action = talkAction;
  }

  toString(): string {
    return this.action;
  }
}

