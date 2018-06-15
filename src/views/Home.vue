<template lang="pug">
  .home
    ChatView
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ChatView from '@/components/ChatView.vue'; // @ is an alias to /src

@Component({
  components: {
  ChatView
  }
  })
export default class Home extends Vue {}
</script>
