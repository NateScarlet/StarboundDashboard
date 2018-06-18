<template lang="pug">
  ElCard.event-view
    .header(v-if='isShowButton' slot='header')
      ElButton(@click='askPermission') 启用聊天通知
    .event-container
      .event.chat(v-for='i in logStore.events.chat' :key='i.lineno' :style='{order: i.lineno}')
        span.time {{i.time}}
        span.player {{i.player}}
        span.message {{i.message}}
      .event.disconnect(v-for='i in logStore.events.disconnect' :key='i.lineno' :style='{order: i.lineno}')
        span.left
          span.time {{i.time}}
          span.playerId {{i.playerId}}
        span.center
          span.player {{i.player}}
        span.right
          span.reason(v-show='i.reason') {{i.reason}}
      .event.connect(v-for='i in logStore.events.connect' :key='i.lineno' :style='{order: i.lineno}')
        span.left
          span.time {{i.time}}
          span.playerId {{i.playerId}}
        span.center
          span.player {{i.player}}
</template>

<script lang="ts">
import Vue from 'vue';
import { logComputedMinxin } from '@/store/log';
import { Button as ElButton, Card as ElCard } from 'element-ui';
import { rootComputedMixin } from '@/store';
import { REQUEST_NOTIFICATION_PERMISSION } from '@/interface';
import { isSupportNotify } from '@/constant';

export default Vue.extend({
  components: {
    ElButton,
    ElCard,
  },
  computed: {
    ...logComputedMinxin,
    ...rootComputedMixin,
    isShowButton(): boolean {
      return isSupportNotify && !this.isNotifyEnabled;
    },
  },
  methods: {
    askPermission() {
      this.$store.dispatch(REQUEST_NOTIFICATION_PERMISSION);
    },
  },
});
</script>

<style lang="scss" scoped>
.event-view {
  text-align: left;
  height: 100%;
  overflow: auto;
  .header {
    display: flex;
    justify-content: flex-end;
  }
  .event-container {
    position: relative;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
  }
  span {
    padding: 0.2em;
  }
  .time {
    color: grey;
    padding: 0.4em;
  }

  .event {
    padding: 0.4em 0;
  }
  .chat {
    .player {
      color: dodgerblue;
      padding: 0.2em;
      margin: 0 0.2em;
    }
    .message {
      display: inline-block;
      background: #eee;
      border-radius: 0.5em;
      padding: 0.2em 0.5em;
    }
  }
  .connect,
  .disconnect {
    color: gray;
    text-align: center;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .left {
      flex: 0 1 auto;
      padding: 0.2em 0;
    }
    .right {
      flex: auto;
      text-align: right;
      word-break: break-all;
    }
    .playerId::before {
      content: "玩家ID:";
    }
    &:hover {
      background: #eee;
    }
    &:not(:hover) {
      .time,
      .playerId {
        display: none;
      }
    }
    .player {
      background: #eee;
      padding: 0 0.5em;
      border-radius: 0.5em;
    }
  }
  .connect {
    .player:after {
      content: "加入";
      color: lightgreen;
    }
  }
  .disconnect {
    .player:after {
      content: "离开";
      color: lightpink;
    }
  }
}

@media (max-width: 400px) {
}
</style>
