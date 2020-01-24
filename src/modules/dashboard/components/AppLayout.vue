<template>
  <div>
    <AppToolbar v-model="drawer" />
    <AppMenu v-model="drawer" />
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
