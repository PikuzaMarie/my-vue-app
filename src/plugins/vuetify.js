import 'vuetify/styles'
import { createVuetify } from 'vuetify'

const vuetify = createVuetify({
  theme: {
    themes: {
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
      },
    },
  },
})

export default vuetify
