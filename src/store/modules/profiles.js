import axios from 'axios'

const state = {
  profiles: [],
  loading: false,
  error: null,
  isFilterOpen: false,
  filteredProfiles: [],
  filters: {
    firstName: '',
    lastName: '',
    company: '',
    jobTitle: '',
    phone: '',
    email: '',
    interests: '',
  },
}

const getters = {
  allProfiles: (state) => state.profiles,
  isLoading: (state) => state.loading,
  getError: (state) => state.error,
  isFilterOpen: (state) => state.isFilterOpen,
  filteredProfiles: (state) => state.filteredProfiles,
}

const mutations = {
  setProfiles: (state, profiles) => {
    state.profiles = profiles
    state.filteredProfiles = profiles
  },
  setFilterState(state, value) {
    state.isFilterOpen = value
  },
  applyFilters(state) {
    let filtered = [...state.profiles]

    for (const key in state.filters) {
      if (state.filters[key]) {
        filtered = filtered.filter((profile) =>
          String(profile[key]).toLowerCase().includes(state.filters[key].toLowerCase()),
        )
      }
    }

    state.filteredProfiles = filtered
  },
  resetFilters(state) {
    state.filters = {
      firstName: '',
      lastName: '',
      company: '',
      jobTitle: '',
      phone: '',
      email: '',
      interests: '',
    }
    state.filteredProfiles = [...state.profiles]
  },
  addProfile: (state, profile) => {
    state.profiles = [profile, ...state.profiles]
    state.filteredProfiles = [profile, ...state.filteredProfiles]
  },
  updateProfile: (state, updatedProfile) => {
    const index = state.profiles.findIndex((profile) => profile.id === updatedProfile.id)
    if (index !== -1) {
      state.profiles.splice(index, 1, updatedProfile)
      const filteredIndex = state.filteredProfiles.findIndex(
        (profile) => profile.id === updatedProfile.id,
      )
      if (filteredIndex !== -1) {
        state.filteredProfiles.splice(filteredIndex, 1, updatedProfile)
      }
    }
  },
  deleteProfile: (state, profileId) => {
    state.profiles = state.profiles.filter((profile) => profile.id !== profileId)
    state.filteredProfiles = state.filteredProfiles.filter((profile) => profile.id !== profileId)
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
  updateFilterState({ commit }, value) {
    commit('setFilterState', value)
  },
  setFilters({ commit }, filters) {
    commit('setFilters', filters)
    commit('applyFilters')
  },
  applyFilters({ commit }) {
    commit('applyFilters')
  },
  resetFilters({ commit }) {
    commit('resetFilters')
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
