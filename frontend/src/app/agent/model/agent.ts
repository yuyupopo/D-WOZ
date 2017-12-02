import { Experiment } from '../../model/experiment';
export interface Agent {
  id: number;
  name: string;
  triggers: Array<Trigger>;
  explanation: string;
}

export interface Trigger {
  id: number;
  trigger: string;
  dialog: Dialog;
}

export interface Dialog {
  id: number;
  action: Action;
  behaviors: Array<number>;
}

export interface Behavior {
  id: number;
  behavior: string;
  nextDialog: Dialog;
}


export interface Action {
  id: number;
  action: string;
}
