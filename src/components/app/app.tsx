import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export class App extends Vue {

  public render(h) {
    return (
      <div id='app'>
        <router-view></router-view>
      </div>
    )
  }
}
