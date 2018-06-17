<template lang="pug">
  ElCard.chat-view
    .header(v-if='isShowButton' slot='header')
      ElButton(@click='askPermission') 启用聊天通知
    .chat-container
      .chat(v-for='i in logStore.chats' :key='i.lineno')
        span.time {{i.time}}
        span.user {{i.user}}
        span.message {{i.message}}
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
.chat-view {
  text-align: left;
  height: 100%;
  overflow: auto;
  .header {
    display: flex;
    justify-content: flex-end;
  }
  .chat-container {
    position: relative;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .chat {
    padding: 0.4em;
    .time {
      // font-size: 0.8em;
      color: grey;
    }
    // &:not(:hover) {
    //   .time {
    //     display: none;
    //   }
    // }
    .user {
      color: dodgerblue;
      padding: 0.2em;
      margin: 0 0.2em;
      // &:after {
      //   content: ":";
      // }
    }
    .message {
      background: lightgray;
      border-radius: 0.5em;
      padding: 0.2em 0.5em;
    }
  }
}
</style>
