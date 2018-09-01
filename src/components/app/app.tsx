import Vue from 'vue'
import Component from 'vue-class-component'

import styles from './styles.css'

@Component
export class App extends Vue {
  public render() {
    return (
      <div id="app" class={styles.app}>
        <router-view />
      </div>
    )
  }
}
