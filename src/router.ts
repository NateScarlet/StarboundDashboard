import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Log from './views/Log.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/log',
      name: 'log',
      component: Log,
    },
  ],
});
