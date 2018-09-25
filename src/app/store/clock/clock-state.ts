export interface ClockState {
  speed: number;
  tick: number;
  bpm: number;
  started: boolean;
  type: string;
}

const defaultState: ClockState = {
  speed: 300,
  tick: 0,
  bpm: 60,
  started: false,
  type: null,
};

export const CLOCK_UPDATE_TICK = '[clock] update tick';
export const CLOCK_UPDATE_BPM = '[clock] update bpm';
export const CLOCK_UPDATE_SPEED = '[clock] update speed';
export const CLOCK_UPDATE_STARTED = '[clock] update started';
export const CLOCK_UPDATE_ALL = '[clock] update all';

const types = {
  CLOCK_UPDATE_TICK,
  CLOCK_UPDATE_SPEED,
  CLOCK_UPDATE_BPM,
  CLOCK_UPDATE_ALL,
  CLOCK_UPDATE_STARTED,
};
export const clockActions = {
  updateTick: (payload: number) => {
    return {type: CLOCK_UPDATE_TICK, payload};
  },
  updateBpm: (payload: number) => {
    return {type: CLOCK_UPDATE_BPM, payload};
  },
  updateSpeed: (payload: boolean) => {
    return {type: CLOCK_UPDATE_SPEED, payload};
  },
  updateStarted: (payload: boolean) => {
    return {type: CLOCK_UPDATE_STARTED, payload};
  },
  types,
};

export function ClockReducer(state: ClockState = defaultState, action: any) {
  if (!action.type.includes('[clock]')) { return state; }
  switch (action.type) {
    case CLOCK_UPDATE_TICK:
      return {...state, ...{ tick: action.payload}, ...{type: action.type}};
    case CLOCK_UPDATE_BPM:
      return {...state, ...{ bpm: action.payload}, ...{type: action.type}};
    case CLOCK_UPDATE_SPEED:
      return {...state, ...{ speed: action.payload}, ...{type: action.type}};
    case CLOCK_UPDATE_STARTED:
      return {...state, ...{ started: action.payload}, ...{type: action.type}};
    case CLOCK_UPDATE_ALL:
      return {...state, ...action.payload, ...{type: action.type}};
    default:
      return {...state, type: action.type};
  }
}
