import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter } from 'vuex-class'

@Component
export class Home extends Vue {
  @Getter('message') public message

  public render(h) {
    return (
      <div>
        {this.message}
      </div>
    )
  }
}
