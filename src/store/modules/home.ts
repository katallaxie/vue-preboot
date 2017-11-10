// initial state
const init = {
  messages: [
    'I ❤️ VueJS',
    'I ❤️ TypeStyle',
    'I ❤️ one file',
  ]
}

// getters
const getters = {
  message: (state) => {
    return state.messages[Math.floor(Math.random() * state.messages.length)]
  }
}

// actions
const actions = {

}

// mutations
const mutations = {

}

export default {
  state: init,
  getters,
  actions,
  mutations
}
