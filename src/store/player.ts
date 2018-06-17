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

import { PlayerState, RootState, UPDATE_PLYAERS, PlayerUpdateMutationPayload, PlayerResponse, PUSH_PLYAER, POP_PLYAER, PlayerPopMutationPayload, PlayerPushMutationPayload, PlayerData } from '@/interface';
import axios from 'axios';
import { Notification, Message } from 'element-ui';
const state: PlayerState = {
  players: new Set(),
};

const getters: GetterTree<PlayerState, RootState> = {
};

interface PlayerComputedMixin
    extends DefaultComputed {
    playerStore: () => PlayerState;
}

export const playerComputedMinxin = {
  ...mapState(['playerStore']),
  ...mapGetters(Object.keys(getters)),
} as PlayerComputedMixin;

const mutations: MutationTree<PlayerState> = {
  [UPDATE_PLYAERS](contextState, payload: PlayerUpdateMutationPayload) {
    contextState.players = payload.data;
  },
  [PUSH_PLYAER](contextState, payload: PlayerPushMutationPayload) {
    contextState.players.add(payload.data);
  },
  [POP_PLYAER](contextState, payload: PlayerPopMutationPayload) {
    contextState.players.delete(payload.data);
  },

};

const actions: ActionTree<PlayerState, RootState> = {
  async [UPDATE_PLYAERS](context) {
    return axios.get('/api/server/players').then(
      response => {
        const responseData: PlayerResponse[] = response.data;
        const data = new Set<PlayerData>();
        responseData.forEach(i => {
          data.add({ name: i.name });
        });
        const payload: PlayerUpdateMutationPayload = { data: data };
        context.commit(UPDATE_PLYAERS, payload);
        Message.success('在线玩家信息已更新');
      }
    ).catch(
      reason => {
        Notification.error({ title: '读取玩家信息失败', message: String(reason) });
      }
    );
  },
};

const module: Module<PlayerState, RootState> = {
  state,
  getters,
  mutations,
  actions,
};
export default module;
