<template lang="pug">
  .log
    LogView
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LogView from '@/components/LogView.vue'; // @ is an alias to /src

@Component({
  components: {
  LogView
  }
  })
export default class Home extends Vue {}
</script>
