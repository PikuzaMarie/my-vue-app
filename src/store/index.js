import profiles from './modules/profiles'
import { createStore } from 'vuex'
import sidebar from './modules/sidebar'

const store = createStore({
  modules: {
    profiles,
    sidebar,
  },
})

export default store
