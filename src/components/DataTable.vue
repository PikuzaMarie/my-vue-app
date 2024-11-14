<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="profiles"
      :loading="loading"
      item-value="email"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <tr>
          <v-icon>
            {{ props.item.status ? 'mdi-cloud-check-variant' : 'mdi-cloud-alert-variant' }}
          </v-icon>
          <td>{{ props.item.firstName }}</td>
          <td>{{ props.item.lastName }}</td>
          <td>{{ props.item.email }}</td>
          <td>{{ props.item.phone }}</td>
          <td>{{ props.item.company }}</td>
          <td>{{ props.item.jobTitle }}</td>
          <td>{{ props.item.interests }}</td>
        </tr>
      </template>
    </v-data-table>

    <v-alert v-if="error" type="error" dismissible>{{ error }}</v-alert>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      headers: [
        { title: 'Status', align: 'start', key: 'status', sortable: false },
        { title: 'First Name', align: 'start', key: 'firstName', sortable: true },
        { title: 'Last Name', align: 'start', key: 'lastName', sortable: true },
        { title: 'Email', align: 'start', key: 'email', sortable: false },
        { title: 'Phone', align: 'start', key: 'phone', sortable: false },
        { title: 'Company', align: 'start', key: 'company', sortable: false },
        { title: 'Job Title', align: 'start', key: 'jobTitle', sortable: false },
        { title: 'Interests', align: 'start', key: 'interests', sortable: false },
      ],
      loading: false,
    }
  },
  computed: {
    ...mapState('profiles', {
      profiles: (state) => state.profiles,
      isLoading: (state) => state.loading,
      error: (state) => state.error,
    }),
  },
  methods: {
    ...mapActions('profiles', ['fetchProfiles']),
  },
  mounted() {
    this.fetchProfiles()
  },
}
</script>
