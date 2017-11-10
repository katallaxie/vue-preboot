import * as Actions from './mutations'

export const setup = ({ commit }) => {
  commit(Actions.SETUP, { isSetup: true })
}
