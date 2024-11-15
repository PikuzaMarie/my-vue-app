<script>
import DataTable from '@/components/DataTable.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageSidebar from '@/components/PageSidebar.vue'
import FilterSidebar from '@/components/FilterSidebar.vue'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    PageHeader,
    PageSidebar,
    DataTable,
    FilterSidebar,
  },
  computed: {
    ...mapState('sidebar', ['isOpen', 'selectedItemName']),
    ...mapState('profiles', ['isFilterOpen']),
  },
  methods: {
    ...mapActions('sidebar', {
      updateSidebarState: 'updateDrawerState',
      updateSelectedItemName: 'updateSelectedItemName',
    }),
    ...mapActions('profiles', {
      updateFilterState: 'updateFilterState',
    }),
    toggleDrawer() {
      this.updateSidebarState(!this.isOpen)
    },
    onSidebarUpdate(newState) {
      this.updateSidebarState(newState)
    },
    toggleFilter() {
      this.updateFilterState(!this.isOpen)
    },
    onFilterUpdate(newState) {
      this.updateFilterState(newState)
    },
  },
}
</script>

<template>
  <v-app>
    <PageHeader @toggleDrawer="toggleDrawer" @toggleFilter="toggleFilter" />
    <PageSidebar :modelValue="isOpen" @update:modelValue="onSidebarUpdate" />
    <FilterSidebar :modelValue="isFilterOpen" @update:modelValue="onFilterUpdate" />
    <div style="margin: 75px 0 0 345px">
      <DataTable :selectedItemName="selectedItemName" />
    </div>
  </v-app>
</template>
