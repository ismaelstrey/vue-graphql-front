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
    <AppFloatingButton />
  </div>
</template>

<script>

import AppMenu from './AppMenu'
import AppFloatingButton from './AppFloatingButton'
import AppToolbar from './AppToolbar'

export default {
  name: 'AppLayout',
  components: {
    AppMenu,
    AppFloatingButton,
    AppToolbar
  },
  data: () => ({
    drawer: false
  })
}

</script>
