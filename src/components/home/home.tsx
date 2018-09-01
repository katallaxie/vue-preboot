import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter, Mutation } from 'vuex-class'

import { biggerClass } from './style'

@Component
export class Home extends Vue {
  @Getter('home/message')
  public message

  @Mutation('home/update')
  public update

  public handleClick() {
    this.update([`There is no 🧚‍♀️. Sorry.`])
  }

  public render() {
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col">
            <div data-testid="greeting" class={biggerClass}>
              {this.message}
              <el-row>
                <el-button onClick={this.handleClick}>Do magic ✨</el-button>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
