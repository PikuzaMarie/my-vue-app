import axios from 'axios'

const state = {
  profiles: [],
  loading: false,
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
  addProfile: (state, profile) => {
    state.profiles = [profile, ...state.profiles]
  },
  updateProfile: (state, updatedProfile) => {
    const index = state.profiles.findIndex((profile) => profile.id === updatedProfile.id)
    if (index !== -1) {
      state.profiles.splice(index, 1, updatedProfile)
    }
  },
  deleteProfile: (state, profileId) => {
    state.profiles = state.profiles.filter((profile) => profile.id !== profileId)
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
  async addProfile({ commit }, newProfile) {
    commit('setLoading', true)
    try {
      const response = await axios.post('https://retoolapi.dev/ilF1Pj/profiles', newProfile)
      commit('addProfile', response.data)
    } catch (error) {
      commit('setError', error.message)
    } finally {
      commit('setLoading', false)
    }
  },

  async updateProfile({ commit }, updatedProfile) {
    commit('setLoading', true)
    try {
      const response = await axios.put(
        `https://retoolapi.dev/ilF1Pj/profiles/${updatedProfile.id}`,
        updatedProfile,
      )
      commit('updateProfile', response.data)
    } catch (error) {
      commit('setError', error.message)
    } finally {
      commit('setLoading', false)
    }
  },

  async deleteProfile({ commit }, profileId) {
    commit('setLoading', true)
    try {
      await axios.delete(`https://retoolapi.dev/ilF1Pj/profiles/${profileId}`)
      commit('deleteProfile', profileId)
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
