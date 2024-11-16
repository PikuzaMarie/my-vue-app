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
    ...mapState('sidebar', ['isSidebarOpen', 'selectedTabName']),
    ...mapState('profiles', ['isFilterOpen']),
  },
  methods: {
    ...mapActions('sidebar', {
      updateSidebarState: 'updateSidebarState',
      updateselectedTabName: 'updateSelectedTabName',
    }),
    ...mapActions('profiles', {
      updateFilterState: 'updateFilterState',
    }),
    toggleSidebar() {
      this.updateSidebarState(!this.isSidebarOpen)
    },
    updateSidebarStateHandler(newState) {
      this.updateSidebarState(newState)
    },
    toggleFilter() {
      this.updateFilterState(!this.isFilterOpen)
    },
    updateFilterStateHandler(newState) {
      this.updateFilterState(newState)
    },
  },
}
</script>

<template>
  <v-app>
    <header>
      <PageHeader @toggleSidebar="toggleSidebar" @toggleFilter="toggleFilter" />

      <FilterSidebar :modelValue="isFilterOpen" @update:modelValue="updateFilterStateHandler" />
    </header>
    <main>
      <PageSidebar :modelValue="isSidebarOpen" @update:modelValue="updateSidebarStateHandler" />
      <DataTable :selectedTabName="selectedTabName" />
    </main>
  </v-app>
</template>
