import Vue from 'vue';
import Router from 'vue-router';
import { Home } from '../components/home';

Vue.use(Router);

// create function
export default function() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: Home
      }
    ]
  });
}
