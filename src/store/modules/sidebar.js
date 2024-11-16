const state = {
  isSidebarOpen: true,
  selectedTabName: 'all',
}
const getters = {
  getSidebarState(state) {
    return state.isSidebarOpen
  },
  getSelectedTabName(state) {
    return state.selectedTabName
  },
}
const mutations = {
  setSidebarState(state, value) {
    state.isSidebarOpen = value
  },
  setSelectedTabName(state, tabName) {
    state.selectedTabName = tabName
  },
}

const actions = {
  updateSidebarState({ commit }, value) {
    commit('setSidebarState', value)
  },
  updateSelectedTabName({ commit }, tabName) {
    commit('setSelectedTabName', tabName)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
