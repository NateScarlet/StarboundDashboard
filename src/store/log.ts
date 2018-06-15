import { DefaultComputed } from 'vue/types/options';
import {
  Module,
  MutationTree,
  ActionTree,
  GetterTree,
  mapGetters,
  mapState,
  ActionContext
} from 'vuex';

import { LogState, RootState, PARSE_LOG, LogParseActionPayload, PUSH_LOG, LogPushMutationPayload, ChatPushMutationPayload, PUSH_CHAT, mapGettersMixin, LogGetters } from '@/interface';

const state: LogState = {
  logs: [],
  chats: [],
  infos: [],
  planets: []
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
  ...mapGetters(Object.keys(getters))
} as LogComputedMixin;

const mutations: MutationTree<LogState> = {
  [PUSH_LOG](contextState, payload: LogPushMutationPayload) {
    contextState.logs.push(payload.data);
  },
  [PUSH_CHAT](contextState, payload: ChatPushMutationPayload) {
    contextState.chats.push(payload.data);
  }

};

const actions: ActionTree<LogState, RootState> = {
  [PARSE_LOG](context, payload: LogParseActionPayload) {
    const data = payload.data;
    const logPayload: LogPushMutationPayload = { data };
    context.commit(PUSH_LOG, logPayload);
    const match = data.match(/\[(.+)\] \[Info\] Chat: <(.*)> (.+)/);
    if (match) {
      const chatPayload: ChatPushMutationPayload = {
        data: {
          time: match[1],
          user: match[2],
          message: match[3]
        }
      };
      context.commit(PUSH_CHAT, chatPayload);
    }
  }
};

const module: Module<LogState, RootState> = {
  state,
  getters,
  mutations,
  actions
};
export default module;
