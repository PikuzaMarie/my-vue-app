import axios from 'axios'

const state = {
  profiles: [],
  loading: false, // Здесь состояние должно называться `loading`
  error: null,
}

const getters = {
  allProfiles: (state) => state.profiles,
  isLoading: (state) => state.loading,
  getError: (state) => state.error,
}

const mutations = {
  setProfiles: (state, profiles) => {
    state.profiles = profiles
  },
  setLoading: (state, loading) => {
    state.loading = loading
  },
  setError: (state, error) => {
    state.error = error
  },
}

const actions = {
  async fetchProfiles({ commit }) {
    commit('setLoading', true)
    try {
      const response = await axios.get('https://retoolapi.dev/ilF1Pj/profiles')
      commit('setProfiles', response.data)
    } catch (error) {
      commit('setError', error.message)
    } finally {
      commit('setLoading', false)
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
