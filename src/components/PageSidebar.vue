<template>
  <v-navigation-drawer v-model="isSidebarOpen" width="337" class="elevation-2" permanent>
    <v-list class="d-flex flex-md-column ga-md-2 pl-7 pt-8 pr-0 pb-0">
      <v-list-item-title class="text-h6">Профили</v-list-item-title>
      <v-list-item
        link
        :class="[{ 'selected-tab': selectedTabName === 'all' }, 'text-subtitle-2 pl-0']"
        @click="selectTab('all')"
      >
        <v-icon icon="mdi-check-circle" size="large" color="primary" />
        Все
      </v-list-item>
      <v-list-item
        link
        :class="[{ 'selected-tab': selectedTabName === 'processed' }, 'text-subtitle-2 pl-0']"
        @click="selectTab('processed')"
      >
        <v-icon icon="mdi-check-circle" size="large" color="primary" />
        Обработанные
      </v-list-item>
      <v-list-item
        link
        :class="[{ 'selected-tab': selectedTabName === 'unprocessed' }, 'text-subtitle-2 pl-0']"
        @click="selectTab('unprocessed')"
      >
        <v-icon icon="mdi-alert-circle" size="large" color="primary" />
        Не обработанные
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('sidebar', ['isSidebarOpen', 'selectedTabName']),
  },
  methods: {
    ...mapActions('sidebar', { updateSelectedTabName: 'updateSelectedTabName' }),
    selectTab(itemName) {
      this.updateSelectedTabName(itemName)
    },
  },
}
</script>
<style>
.selected-tab {
  font-weight: 500;
  color: var(--vt-primary);
}
</style>
