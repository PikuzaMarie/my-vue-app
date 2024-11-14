<script>
import PageHeader from '@/components/PageHeader.vue'
import PageSidebar from '@/components/PageSidebar.vue'
export default {
  components: {
    PageHeader,
    PageSidebar,
  },
  data() {
    return {
      drawer: false,
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    },
  },
}
</script>

<template>
  <v-app>
    <PageHeader @toggleDrawer="toggleDrawer" />
    <PageSidebar v-model="drawer" />
    <v-main> </v-main>
  </v-app>
</template>
