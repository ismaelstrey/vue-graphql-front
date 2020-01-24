<template>
  <div>
    <AppToolbar v-model="drawer" />
    <AppMenu v-model="drawer" />

    <v-container grid-list-md>
      <v-layout>
        <v-flex xs12>
          <slot />
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>

<script>

import AppMenu from './AppMenu'
import AppToolbar from './AppToolbar'

export default {
  name: 'AppLayout',
  components: {
    AppMenu,
    AppToolbar
  },
  data: () => ({
    drawer: false
  })
}

</script>
