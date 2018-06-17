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
import { LogState, RootState, PARSE_LOG, LogParseActionPayload, PUSH_LOG, LogPushMutationPayload, ChatPushMutationPayload, PUSH_CHAT, mapGettersMixin, LogGetters, ChatData } from '@/interface';
import { isSupportNotify, isMobile } from '@/constant';

const state: LogState = {
  logs: [],
  chats: [],
  infos: [],
  planets: [],
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
  [PUSH_CHAT](contextState, payload: ChatPushMutationPayload) {
    contextState.chats.push(payload.data);
  },

};

const actions: ActionTree<LogState, RootState> = {
  [PARSE_LOG](context, payload: LogParseActionPayload) {
    const data = payload.data;
    const logPayload: LogPushMutationPayload = { data };
    context.commit(PUSH_LOG, logPayload);
    const match = data.match(/\[(.+)\] \[Info\] Chat: <(.*)> (.+)/);
    if (match) {
      const chatdata: ChatData = {
        time: match[1],
        user: match[2],
        message: match[3],
        lineno: context.state.logs.length + 1,
      };
      const chatPayload: ChatPushMutationPayload = {
        data: chatdata,
      };
      context.commit(PUSH_CHAT, chatPayload);
      if (!payload.isInit && isSupportNotify) {
        new Notify(chatdata.user, { body: chatdata.message, timeout: isMobile ? 60 : 3, tag: JSON.stringify(chatdata) }).show();
      }
    }
  },
};

const module: Module<LogState, RootState> = {
  state,
  getters,
  mutations,
  actions,
};
export default module;
