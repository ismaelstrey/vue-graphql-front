import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import pt from 'vuetify/es5/locale/pt'
import colors from 'vuetify/lib/util/colors'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

export default new Vuetify({
  iconfont: 'md',
  lang: {
    locales: {
      pt
    },
    current: 'pt'
  },
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: colors.teal.darken1,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        info: colors.blue,
        error: colors.pink.darken2,
        warning: colors.purple.darken1
      }
    }
  }

})
