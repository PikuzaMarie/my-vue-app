import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '../styles/base.css'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme: {
        dark: false,
        colors: {
          primary: '#0f4c82',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#DF2B2B',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

export default vuetify
