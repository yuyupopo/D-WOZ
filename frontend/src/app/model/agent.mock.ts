import { Agent, Dialog, Behavior, Trigger, ListenTrigger, Action, TalkAction } from './agent';
import { Experiment } from './experiment';

    const b2: Behavior = new Behavior(2, '고마워');
    const b1: Behavior = new Behavior(1, '내일 날씨는');
    const a1: Action = new TalkAction(1, '오늘 날씨는 하루종일 비야');
  const d1: Dialog = new Dialog(1, a1, [b1, b2]);

  const a2: Action = new TalkAction(2, '내일 따위 상관없어요');
const d2: Dialog = new Dialog(2, a2);

  const a3: Action = new TalkAction(3, '당연하지');
const d3: Dialog = new Dialog(3, a3);

b1.nextDialog = d2;
b2.nextDialog = d3;

const t1: Trigger = new ListenTrigger(1, '오늘 날씨가 어떄', d1);
const agent1: Agent = new Agent(1, 'mock agent 1', [t1], 'this is mock data about weather');


const b4: Behavior = new Behavior(4, '요즘 유행하는 거');
const b3: Behavior = new Behavior(3, '코미디');
const a4: Action = new TalkAction(4, '어떤 영화가 좋으세요');
const d4: Dialog = new Dialog(4, a4, [b3, b4]);

const a5: Action = new TalkAction(5, '브리짓 존스의 일기는 어떨까요');
const d5: Dialog = new Dialog(5, a5);

const a6: Action = new TalkAction(6, '잠시만요 검색해볼께요');
const d6: Dialog = new Dialog(6, a6);

b3.nextDialog = d5;
b4.nextDialog = d6;

const a7: Action = new TalkAction(7, '아니요');
const d7: Dialog = new Dialog(7, a7);

const t2: Trigger = new ListenTrigger(2, '영화 추천해 줘', d4);
const t3: Trigger = new ListenTrigger(2, '영화 오늘 상영해?', d7);
const agent2: Agent = new Agent(2, 'mock agent 2', [t2, t3], 'this is mock data about movie');


const agentList: Array<Agent> = [agent1, agent2];
const behaviorList: Array<Behavior> = [b1, b2, b3, b4];
const dialogList: Array<Dialog> = [d1, d2, d3, d4, d5, d6, d7];
const triggerList: Array<Trigger> = [t1, t2, t3];
const actionList: Array<Action> = [a1, a2, a3, a4, a5, a6, a7];

export { agentList as MockAgentList };
export { behaviorList as MockBehaviorList};
export { dialogList as MockDialogList };
export { triggerList as MockTriggerList };
export { actionList as MockActionList };
