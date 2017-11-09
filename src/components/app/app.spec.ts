import Vue from 'vue'
import { App } from './app';

describe('App', () => {
  it('renders the correct message', () => {
    const Ctor = Vue.extend(App)
    const vm = new Ctor().$mount()
    expect(vm.$el.textContent).not.toBe('bye!')
  })
})
