import { App } from './components/app';
import { sync } from 'vuex-router-sync';
import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import { Row, Button } from 'element-ui';

// https://element.eleme.io/
Vue.use(Row);
Vue.use(Button);

// create function
export default function(store, router) {
  // route state store
  sync(store, router);

  // constructing app
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });

  return { app, router, store };
}
