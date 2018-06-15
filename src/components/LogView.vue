<template lang="pug">
  .chat-view
    .chat(v-for='i, index in logStore.logs' :key='index') {{ i }}
</template>

<script lang="ts">
import Vue from 'vue';
import { logComputedMinxin } from '@/store/log';

export default Vue.extend({
  computed: {
    ...logComputedMinxin
  }
});
</script>

<style lang="scss" scoped>
.chat-view {
  text-align: left;
}
</style>
