const state = {
  isOpen: true,
  selectedItemName: 'all',
}
const getters = {
  getSidebarState(state) {
    return state.isOpen
  },
  getSelectedItemName(state) {
    return state.selectedItemName
  },
}
const mutations = {
  setSidebarState(state, value) {
    state.isOpen = value
  },
  setSelectedItemName(state, itemName) {
    state.selectedItemName = itemName
  },
}

const actions = {
  updateSidebarState({ commit }, value) {
    commit('setSidebarState', value)
  },
  updateSelectedItemName({ commit }, itemName) {
    commit('setSelectedItemName', itemName)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
