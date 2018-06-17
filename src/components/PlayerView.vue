<template lang="pug">
  ElCard.player-view
    .header(slot='header')
      .text 在线玩家
      ElButton(@click='updatePlayerInfo' icon='el-icon-refresh' size='mini') 更新
    .player(v-for='i in players') {{i.name}}
</template>

<script lang="ts">
import Vue from 'vue';

import { Button as ElButton, Card as ElCard } from 'element-ui';

import { playerComputedMinxin } from '@/store/player';
import { UPDATE_PLYAERS, PlayerData } from '@/interface';

export default Vue.extend({
  components: {
    ElButton,
    ElCard,
  },
  computed: {
    ...playerComputedMinxin,
    players(): PlayerData[] {
      return Array.from(this.playerStore.players);
    },
  },
  methods: {
    updatePlayerInfo() {
      this.$store.dispatch(UPDATE_PLYAERS);
    },
  },
});
</script>

<style lang="scss">
.player-view {
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    align-items: center;
  }
}
</style>
