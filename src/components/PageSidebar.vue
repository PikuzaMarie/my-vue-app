<template>
  <v-navigation-drawer v-model="isOpen" :width="335" permanent>
    <v-list>
      <v-list-item title="Профили"></v-list-item>
      <v-list-item
        link
        :class="{ 'selected-item': selectedItemName === 'all' }"
        @click="selectItem('all')"
      >
        <v-icon icon="mdi-check-circle" size="large" color="primary" />
        Все
      </v-list-item>
      <v-list-item
        link
        :class="{ 'selected-item': selectedItemName === 'processed' }"
        @click="selectItem('processed')"
      >
        <v-icon icon="mdi-alert-circle" size="large" color="primary" />
        Обработанные
      </v-list-item>
      <v-list-item
        link
        :class="{ 'selected-item': selectedItemName === 'unprocessed' }"
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
  background-color: #e4e4e4;
}
</style>
