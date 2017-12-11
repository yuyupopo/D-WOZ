import { Experiment } from '../../model/experiment';
export interface Agent {
  id: number;
  name: string;
  triggers?: Array<number>;
  explanation: string;
}

export interface Trigger {
  id: number;
  trigger: string;
  dialog: number;
}

export interface Dialog {
  id: number;
  action: string;
  behaviors: Array<number>;
}

export interface Behavior {
  id: number;
  behavior: string;
  nextDialog: number;
}
