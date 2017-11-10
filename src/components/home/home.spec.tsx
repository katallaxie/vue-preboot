import Vue from 'vue'
import { Home } from './home';
import { mount } from 'avoriaz'
import Vuex from 'vuex';

Vue.use(Vuex)

describe('Home', () => {
  let getters
  let store
  beforeEach(() => {
    getters = {
      message: () => 'bye!'
    }
    store = new Vuex.Store({
      getters
    })
  })


  it('renders the correct message', () => {
    const wrapper = mount(Home, { store })
    const div = wrapper.find('div')[0]
    expect(div.text()).toBe('bye!')
  })
})
