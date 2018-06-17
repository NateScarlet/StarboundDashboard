import { DefaultComputed } from 'vue/types/options';
import {
  Module,
  MutationTree,
  ActionTree,
  GetterTree,
  mapGetters,
  mapState,
  ActionContext,
} from 'vuex';
import Notify from 'notifyjs';
import {
  LogState, RootState, PARSE_LOG,
  LogParseActionPayload, PUSH_LOG,
  LogPushMutationPayload, mapGettersMixin,
  LogGetters, ChatEvent,
  DisconnectEvent, LogEventPushMutationPayload,
  PUSH_LOG_EVENT, LogEvent, ConnectEvent, UPDATE_PLYAERS,
} from '@/interface';
import { isSupportNotify, isMobile } from '@/constant';

const state: LogState = {
  logs: [],
  planets: [],
  events: {
    chat: [],
    disconnect: [],
    connect: [],
  },

};

const getters: GetterTree<LogState, RootState> = {
};

interface LogComputedMixin
  extends DefaultComputed,
  mapGettersMixin<LogGetters> {
  logStore: () => LogState;
}

export const logComputedMinxin = {
  ...mapState(['logStore']),
  ...mapGetters(Object.keys(getters)),
} as LogComputedMixin;

const mutations: MutationTree<LogState> = {
  [PUSH_LOG](contextState, payload: LogPushMutationPayload) {
    contextState.logs.push(payload.data);
  },
  [PUSH_LOG_EVENT](contextState, payload: LogEventPushMutationPayload) {
    (contextState.events[payload.event.type as keyof typeof contextState['events']] as Array<LogEvent>).push(payload.event);
  },
};

const actions: ActionTree<LogState, RootState> = {
  [PARSE_LOG](context, payload: LogParseActionPayload) {
    const data = payload.data;
    const logPayload: LogPushMutationPayload = { data };
    context.commit(PUSH_LOG, logPayload);
    matchChatData(context, data, payload.isInit) || matchDisconnectData(context, data, payload.isInit) || matchConnectEvent(context, data, payload.isInit);
  },
};

function matchChatData(context: ActionContext<LogState, RootState>, data: string, isInit = false) {
  const match = data.match(/\[(.+)\] \[Info\] Chat: <(.*)> (.+)/);
  if (match) {
    const event: ChatEvent = {
      type: 'chat',
      time: match[1],
      player: match[2],
      message: match[3],
      lineno: context.state.logs.length,
    };
    const payload: LogEventPushMutationPayload = {
      event,
    };
    context.commit(PUSH_LOG_EVENT, payload);
    if (!isInit && isSupportNotify) {
      new Notify(event.player, { body: event.message, timeout: isMobile ? 60 : 3, tag: JSON.stringify(event) }).show();
    }
  }
}

function matchDisconnectData(context: ActionContext<LogState, RootState>, data: string, isInit = false) {
  const match = data.match(/\[(.+)\] \[Info\] UniverseServer: Client '(.+)' <(.+)> \((.+)\) disconnected for reason: ?(.*)/);
  if (match) {
    const event: DisconnectEvent = {
      type: 'disconnect',
      time: match[1],
      player: match[2],
      playerId: match[3],
      ip: match[4],
      reason: match[5],
      lineno: context.state.logs.length,
    };
    const payload: LogEventPushMutationPayload = { event };
    context.commit(PUSH_LOG_EVENT, payload);
    if (!isInit) {
      context.dispatch(UPDATE_PLYAERS);
    }
  }
}

function matchConnectEvent(context: ActionContext<LogState, RootState>, data: string, isInit = false) {
  const match = data.match(/\[(.+)\] \[Info\] UniverseServer: Client '(.+)' <(.+)> \((.+)\) connected/);
  if (match) {
    const event: ConnectEvent = {
      type: 'connect',
      time: match[1],
      player: match[2],
      playerId: match[3],
      ip: match[4],
      lineno: context.state.logs.length,
    };
    const payload: LogEventPushMutationPayload = { event };
    context.commit(PUSH_LOG_EVENT, payload);
    if (!isInit) {
      context.dispatch(UPDATE_PLYAERS);
    }
  }
}

const module: Module<LogState, RootState> = {
  state,
  getters,
  mutations,
  actions,
};
export default module;
