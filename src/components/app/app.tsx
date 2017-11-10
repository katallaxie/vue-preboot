import Vue from 'vue'
import Component from 'vue-class-component'
import { Home } from '../home'

@Component
export class App extends Vue {

  public render(h) {
    return (<Home />)
  }
}
