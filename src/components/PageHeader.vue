<template>
  <v-app-bar class="d-flex justify-content-space-between pl-6 pr-6" color="primary" prominent>
    <v-app-bar-nav-icon variant="text" size="x-large" @click="toggleDrawer"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-btn
      icon="mdi-magnify"
      variant="elevated"
      color="white"
      size="large"
      density="comfortable"
      @click="toggleFilter"
    >
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('sidebar', { updateSidebarState: 'updateSidebarState' }),
    ...mapActions('profiles', { updateFilterState: 'updateFilterState' }),
    toggleDrawer() {
      this.updateSidebarState(!this.$store.state.sidebar.isOpen)
    },
    toggleFilter() {
      this.updateFilterState(!this.$store.state.profiles.isFilterOpen)
    },
  },
}
</script>
