<template lang="pug">
  .chat-view
    ElButton(v-if='isShowButton', @click='askPermission') 启用通知
    .chat(v-for='i in logStore.chats' :key='i.lineno') {{i.time}} {{i.user}}: {{i.message}}
</template>

<script lang="ts">
import Vue from 'vue';
import { logComputedMinxin } from '@/store/log';
import { Button as ElButton } from 'element-ui';
import { rootComputedMixin } from '@/store';
import { REQUEST_NOTIFICATION_PERMISSION } from '@/interface';
import { isSupportNotify } from '@/constant';

export default Vue.extend({
  components: {
    ElButton,
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
}
</style>
