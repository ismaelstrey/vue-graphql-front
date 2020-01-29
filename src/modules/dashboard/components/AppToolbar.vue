<template>
  <v-app-bar
    app
    fixed
    color="primary"
  >
    <v-app-bar-nav-icon @click.stop="$emit('hide', !showMenu)"></v-app-bar-nav-icon>
    <v-toolbar-title>{{title || 'Dashboard'}}</v-toolbar-title>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AppToolbar',
  props: {
    showMenu: Boolean
  },
  model: {
    prop: 'showMenu',
    event: 'hide'
  },
  computed: {
    ...mapState(['title'])
  }
}
</script>
