<template>
  <v-navigation-drawer
    v-model="isFilterOpen"
    width="434"
    transition="transform 0.3s ease"
    permanent
    location="right"
    class="d-flex ga-4 pt-8 pr-8 pb-8 pl-8"
    elevation="2"
  >
    <v-form ref="filterForm" class="d-flex flex-md-column justify-space-between fill-height">
      <v-card variant="text" class="d-flex flex-md-column ga-md-1">
        <v-text-field
          v-model="filters.firstName"
          label="Имя"
          @input="updateFilters"
          density="compact"
          variant="solo"
        />
        <v-text-field
          v-model="filters.lastName"
          label="Фамилия"
          @input="updateFilters"
          density="compact"
          variant="solo"
        />
        <v-text-field
          v-model="filters.company"
          label="Компания"
          @input="updateFilters"
          density="compact"
          variant="solo"
        />
        <v-text-field
          v-model="filters.jobTitle"
          label="Специальность"
          @input="updateFilters"
          density="compact"
          variant="solo"
        />
        <v-text-field
          v-model="filters.phone"
          label="Телефон"
          @input="updateFilters"
          density="compact"
          variant="solo"
        />
        <v-text-field
          v-model="filters.email"
          label="E-mail"
          @input="updateFilters"
          density="compact"
          variant="solo"
        />
        <v-text-field
          v-model="filters.interests"
          label="Интересы"
          @input="updateFilters"
          density="compact"
          variant="solo"
        />
      </v-card>

      <v-card variant="text" class="d-flex justify-end mt-auto ga-md-5">
        <v-btn @click="resetFiltersFromLocal" class="mb-1 text-body-2">Очистить</v-btn>
        <v-btn color="primary" @click="applyFilters" class="mb-1 text-body-2">Применить</v-btn>
      </v-card>
    </v-form>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('profiles', ['filters', 'isFilterOpen']),
  },
  methods: {
    ...mapActions('profiles', ['setFilters', 'resetFilters', 'applyFilters', 'updateFilterState']),
    updateFilters() {
      this.setFilters(this.filters)
    },
    applyFilters() {
      this.setFilters(this.filters)
      this.updateFilterState(false)
    },
    resetFiltersFromLocal() {
      this.resetFilters()
      this.updateFilterState(false)
    },
  },
}
</script>

<style scoped></style>
