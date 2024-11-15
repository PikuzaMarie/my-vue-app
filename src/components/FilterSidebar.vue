<template>
  <v-navigation-drawer
    v-model="isFilterOpen"
    width="350"
    transition="transform 0.3s ease"
    permanent
    location="right"
    class="d-flex ga-4 pt-8 pr-4 pl-4"
  >
    <v-form ref="filterForm">
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
      <v-card variant="text" class="d-flex justify-space-between mt-6">
        <v-btn @click="resetFilters" class="mb-1">Сбросить</v-btn>
        <v-btn color="primary" @click="applyFilters" class="mb-1">Применить</v-btn>
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
    ...mapActions('profiles', ['setFilters', 'resetFilters']),
    updateFilters() {
      this.setFilters(this.filters)
    },
    applyFilters() {
      this.setFilters(this.filters)
      this.isFilterOpen = false
    },
    resetFilters() {
      this.setFilters({
        firstName: '',
        lastName: '',
        company: '',
        jobTitle: '',
        phone: '',
        email: '',
        interests: '',
      })
      this.isFilterOpen = false
    },
  },
  watch: {
    isFilterOpen(newVal) {
      if (!newVal) {
        this.resetFilters()
      }
    },
  },
}
</script>

<style scoped></style>
