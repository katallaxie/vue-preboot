import Vue from 'vue';
import Component from 'vue-class-component'

@Component
export class App extends Vue {
  public message = ''

  public created() {
    const messages = [
      'I ❤️ VueJS',
      'I ❤️ TypeStyle',
      'I ❤️ one file',
    ]

    const randomIndex = Math.floor(Math.random() * messages.length)
    this.message = messages[randomIndex]
  }

  public onMessageChanged(message: string) {
    this.message = message;
  }

  public render(h) {
    return (
      <div>
        {this.message}
      </div>
    )
  }
}
