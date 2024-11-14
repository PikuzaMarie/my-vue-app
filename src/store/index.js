import profiles from './modules/profiles'
import { createStore } from 'vuex'

const store = createStore({
  modules: {
    profiles,
  },
})

export default store
