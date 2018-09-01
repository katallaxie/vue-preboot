// initial state
const init = {
  messages: ['I ❤️ VueJS', 'I ❤️ TypeStyle', 'I ❤️ one file']
};

// getters
const getters = {
  message: state =>
    state.messages[Math.floor(Math.random() * state.messages.length)]
};

// actions
const actions = {};

// mutations
const mutations = {
  update(state, payload) {
    state.messages = [...payload];
  }
};

export default {
  namespaced: true,
  state: init,
  getters,
  actions,
  mutations
};
