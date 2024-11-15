<template>
  <v-navigation-drawer v-model="isOpen" :width="337" class="elevation-1" permanent>
    <v-list class="d-flex flex-md-column ga-md-2 pl-7 pt-8 pr-0 pb-0">
      <v-list-item-title class="text-h6">Профили</v-list-item-title>
      <v-list-item
        link
        :class="[{ 'selected-item': selectedItemName === 'all' }, 'text-subtitle-2 pl-0']"
        @click="selectItem('all')"
      >
        <v-icon icon="mdi-check-circle" size="large" color="primary" />
        Все
      </v-list-item>
      <v-list-item
        link
        :class="[{ 'selected-item': selectedItemName === 'processed' }, ' pl-0']"
        @click="selectItem('processed')"
      >
        <v-icon icon="mdi-check-circle" size="large" color="primary" />
        Обработанные
      </v-list-item>
      <v-list-item
        link
        :class="[{ 'selected-item': selectedItemName === 'unprocessed' }, 'text-subtitle-2 pl-0']"
        @click="selectItem('unprocessed')"
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
    ...mapState('sidebar', ['isOpen', 'selectedItemName']),
  },
  methods: {
    ...mapActions('sidebar', { updateSelectedItemName: 'updateSelectedItemName' }),
    selectItem(itemName) {
      this.updateSelectedItemName(itemName)
    },
  },
}
</script>
<style>
.selected-item {
  font-weight: 500;
  color: var(--vt-primary);
}
</style>
