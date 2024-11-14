<template>
  <v-app-bar class="d-flex justify-content-space-between pl-6 pr-6" color="primary" prominent>
    <v-app-bar-nav-icon variant="text" @click.stop="toggleDrawer"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-icon icon="mdi-magnify" size="x-large" />
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    toggleDrawer() {
      this.$emit('toggleDrawer')
    },
  },
}
</script>
