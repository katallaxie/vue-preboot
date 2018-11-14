import Vue from 'vue'
import { Home } from './home'
import { mount } from 'avoriaz'
import Vuex from 'vuex'
import { Row, Col, Button, Input, Main, Container } from 'element-ui'

Vue.use(Vuex)
Vue.use(Row)
Vue.use(Button)
Vue.use(Input)
Vue.use(Main)
Vue.use(Container)
Vue.use(Col)

describe('Home', () => {
  let getters
  let store
  beforeEach(() => {
    getters = {
      'home/message': () => 'bye!'
    }
    store = new Vuex.Store({
      getters
    })
  })

  it('renders the correct message', () => {
    const wrapper = mount(Home, { store })
    const message = wrapper.find('.greeting')[0]
    expect(message.text()).toBe('bye!')
  })
})
