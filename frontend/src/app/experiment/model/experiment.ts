import { Agent } from '../../agent/model/agent';

export class Experiment {
    id: number;
    name: string;
    instruction: string[];
    scenario: string;
    agentList: number[];
}

export class ExperimentResult {
    experiment: Experiment;
    log: string;
}
