import Vue from 'vue';
import Vuex from 'vuex';
import { RootState, LogParseActionPayload, PARSE_LOG } from '@/interface';
import { getDataFromAppElement } from '@/datatools';
import logStore from './log';

Vue.use(Vuex);

const store = new Vuex.Store<RootState>({
  state: {
    servername: getDataFromAppElement('servername'),
    maxplayers: getDataFromAppElement('maxplayers')
  },
  mutations: {

  },
  actions: {

  },
  modules: {
    logStore
  }
});

function initStore() {
  const rawData = getDataFromAppElement('log');
  const data: string[] = rawData ? JSON.parse(rawData) : [];
  data.map(log => {
    const payload: LogParseActionPayload = { data: log };
    store.dispatch(PARSE_LOG, payload);
  });
}

initStore();

export default store;
