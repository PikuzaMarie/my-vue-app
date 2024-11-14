<template>
  <v-navigation-drawer v-model="drawer" permanent>
    <v-list>
      <v-list-item link>
        <v-icon icon="mdi-check-circle" size="large" color="primary" />
        Все
      </v-list-item>
      <v-list-item link>
        <v-icon icon="mdi-alert-circle" size="large" color="primary" />
        Обработанные
      </v-list-item>
      <v-list-item link>
        <v-icon icon="mdi-alert-circle" size="large" color="primary" />
        Не обработанные
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    drawer: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
  },
}
</script>
