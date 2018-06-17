import Vue from 'vue';
import { DefaultComputed } from 'vue/types/options';
import Vuex, { mapState } from 'vuex';
import { RootState, LogParseActionPayload, PARSE_LOG, REQUEST_NOTIFICATION_PERMISSION, UPDATE_NOTIFICATION_PERMISSION, UPDATE_PLYAERS } from '@/interface';
import { getDataFromAppElement } from '@/datatools';
import logStore from './log';
import playerStore from './player';

import Notify from 'notifyjs';
import { isSupportNotify } from '@/constant';

Vue.use(Vuex);

const store = new Vuex.Store<RootState>({
  state: {
    servername: getDataFromAppElement('servername'),
    maxplayers: getDataFromAppElement('maxplayers'),
    isNotifyEnabled: isSupportNotify && !Notify.needsPermission,
  },
  mutations: {
    [UPDATE_NOTIFICATION_PERMISSION](state) {
      state.isNotifyEnabled = !Notify.needsPermission;
    },
  },
  actions: {
    [REQUEST_NOTIFICATION_PERMISSION](context) {
      if (!isSupportNotify) {
        return;
      }
      const update = () => {
        context.commit(UPDATE_NOTIFICATION_PERMISSION);
      };
      Notify.requestPermission(update, update);
    },
  },
  modules: {
    logStore,
    playerStore,
  },
});

type stateMap<T> = { [name in keyof T]: () => T[name] };

interface RootComputedMixin extends DefaultComputed, stateMap<RootState> { }

export const rootComputedMixin = {
  ...mapState(Object.keys(store.state)),
} as RootComputedMixin;

function initStore() {
  const rawData = getDataFromAppElement('log');
  const data: string[] = rawData ? JSON.parse(rawData) : [];
  data.map(log => {
    const payload: LogParseActionPayload = { data: log, isInit: true };
    store.dispatch(PARSE_LOG, payload);
  });
  store.dispatch(UPDATE_PLYAERS)
}

initStore();

export default store;
