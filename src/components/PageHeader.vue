<template>
  <v-app-bar class="d-flex justify-content-space-between pl-6 pr-6" color="primary" prominent>
    <v-app-bar-nav-icon variant="text" @click="toggleDrawer"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-icon icon="mdi-magnify" size="x-large" />
  </v-app-bar>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('sidebar', { updateSidebarState: 'updateSidebarState' }),
    toggleDrawer() {
      this.updateSidebarState(!this.$store.state.sidebar.isOpen)
    },
  },
}
</script>
