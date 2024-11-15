<script>
import DataTable from '@/components/DataTable.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageSidebar from '@/components/PageSidebar.vue'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    PageHeader,
    PageSidebar,
    DataTable,
  },
  computed: {
    ...mapState('sidebar', ['isOpen', 'selectedItemName']),
  },
  methods: {
    ...mapActions('sidebar', {
      updateSidebarState: 'updateDrawerState',
      updateSelectedItemName: 'updateSelectedItemName',
    }),
    toggleDrawer() {
      this.updateSidebarState(!this.isOpen)
    },
    onSidebarUpdate(newState) {
      this.updateSidebarState(newState)
    },
  },
}
</script>

<template>
  <v-app>
    <PageHeader @toggleDrawer="toggleDrawer" />
    <PageSidebar :modelValue="isOpen" @update:modelValue="onSidebarUpdate" />
    <div style="margin: 75px 0 0 345px">
      <DataTable :selectedItemName="selectedItemName" />
    </div>
  </v-app>
</template>
