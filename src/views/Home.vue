<template lang="pug">
  .home
    .left
      PlayerView
    .right
      EventView
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EventView from '@/components/EventView.vue';
import PlayerView from '@/components/PlayerView.vue';

@Component({
  components: {
  EventView,
  PlayerView
  }
  })
export default class Home extends Vue {}
</script>

<style lang="scss">
.home {
  width: 100%;
  .left {
    flex: 0.2 1 auto;
    padding: 0.5em;
  }
  .right {
    flex: 1 0.1 auto;
    padding: 0.5em;
  }
}

@media (min-width: 800px) {
  .home {
    display: flex;
    justify-content: space-around;
    max-width: 1200px;
    overflow: hidden;
  }
}
</style>
