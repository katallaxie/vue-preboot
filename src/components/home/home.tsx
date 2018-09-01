import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter, Mutation } from 'vuex-class'

import { biggerClass } from './style'

@Component
export class Home extends Vue {
  public text = ''

  @Getter('home/message')
  public message

  @Mutation('home/update')
  public update

  public handleClick() {
    this.update([`There is no 🧚‍♀️. Sorry.`])
  }

  public render() {
    return (
      <el-container>
        <el-main>
          <div class={biggerClass}>
            <el-row>
              <el-col class="greeting" md={8}>
                {this.message}
              </el-col>
            </el-row>
            <el-row>
              <el-col md={8}>
                <el-button onClick={this.handleClick}>Do magic ✨</el-button>
                <el-input placeholder="Please input" v-model={this.text} />
              </el-col>
            </el-row>
            <el-row>
              <el-col md={8}>{this.text}</el-col>
            </el-row>
          </div>
        </el-main>
      </el-container>
    )
  }
}
