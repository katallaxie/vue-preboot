import "core-js/stable";
import "regenerator-runtime/runtime";

import { App } from "./components/app";
import { sync } from "vuex-router-sync";
import Vue from "vue";
import "element-ui/lib/theme-chalk/index.css";
import { Row, Col, Button, Input, Main, Container } from "element-ui";

// https://element.eleme.io/
Vue.use(Row);
Vue.use(Button);
Vue.use(Input);
Vue.use(Main);
Vue.use(Container);
Vue.use(Col);

// create function
export default function (store, router) {
  // route state store
  sync(store, router);

  // constructing app
  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  });

  return { app, router, store };
}
