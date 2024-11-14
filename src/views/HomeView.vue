<script>
import DataTable from '@/components/DataTable.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageSidebar from '@/components/PageSidebar.vue'
export default {
  components: {
    PageHeader,
    PageSidebar,
    DataTable,
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
    <div style="margin: 75px 0 0 335px">
      <DataTable />
    </div>
  </v-app>
</template>
