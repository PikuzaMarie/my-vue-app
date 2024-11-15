<template>
  <div>
    <!-- Toolbar with title, refresh btn and dropdown menu -->
    <v-toolbar elevation="1" color="white">
      <div class="d-flex align-center pl-6 pr-6">
        <v-toolbar-title>{{ getTitle() }}</v-toolbar-title>
        <v-btn icon @click="refreshProfiles" color="primary">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-menu open-on-hover close-on-content-click location="bottom">
        <!--slot for dialog activation-->
        <template v-slot:activator="{ props }">
          <v-btn variant="elevated" color="primary" append-icon="mdi-menu-down" v-bind="props">
            Действия
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="addProfileFromLocal">
            <v-list-item-title>Создать</v-list-item-title>
          </v-list-item>
          <!--slot for dialog activation-->
          <v-list-item @click="selectedProfile ? updateProfileFromLocal(selectedProfile) : null">
            <v-list-item-title>Изменить</v-list-item-title>
          </v-list-item>
          <v-list-item @click="selectedProfile ? deleteProfileFromLocal(selectedProfile.id) : null">
            <v-list-item-title>Удалить</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <!--Error alert if any occur-->
    <v-alert v-if="error" type="error" dismissible>{{ error }}</v-alert>
    <!-- Data Table with profiles and pagination-->
    <v-data-table
      :headers="getHeaders"
      :items="filteredProfiles()"
      :loading="loading"
      class="elevation-3"
      @click:row="handleRowClick"
    >
      <template v-slot:item="{ item }">
        <tr @click="handleRowClick(item)" :class="{ 'selected-row': selectedProfile === item }">
          <td v-if="selectedItemName === 'all'">
            <v-icon v-if="item.status" color="primary">mdi-cloud-check-variant</v-icon>
            <v-icon v-else color="error">mdi-cloud-alert</v-icon>
          </td>
          <td>{{ item.firstName }}</td>
          <td>{{ item.lastName }}</td>
          <td>{{ item.company }}</td>
          <td>{{ item.jobTitle }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.interests }}</td>
        </tr>
      </template>
    </v-data-table>

    <!-- Dialog with a form to create/update profile -->
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">{{ isEditing ? 'Изменить профиль' : 'Создать профиль' }}</span>
        </v-card-title>
        <v-card-text>
          <!-- Profile form -->
          <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
            <v-select
              v-if="isEditing"
              v-model="statusString"
              label="Статус"
              :items="['Не обработан', 'Обработан']"
            >
            </v-select>

            <v-text-field v-model="firstName" label="Имя" required></v-text-field>
            <v-text-field v-model="lastName" label="Фамилия" required></v-text-field>
            <v-text-field v-model="company" label="Компания" required></v-text-field>
            <v-text-field v-model="jobTitle" label="Специальность" required></v-text-field>
            <v-text-field v-model="phone" label="Телефон" required></v-text-field>
            <v-text-field v-model="email" label="E-mail" required></v-text-field>
            <v-text-field v-model="interests" label="Интересы"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn variant="outlined" color="primary" @click="handleCancel">Отмена</v-btn>
          <v-btn variant="elevated" color="primary" :disabled="!valid" @click="handleSubmit">
            {{ isEditing ? 'Сохранить изменения' : 'Добавить профиль' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    selectedItemName: String,
  },
  data() {
    return {
      headers: [
        { title: 'Имя', value: 'firstName', align: 'start', sortable: true },
        { title: 'Фамилия', value: 'lastName', align: 'start', sortable: true },
        { title: 'E-mail', value: 'email', align: 'start', sortable: false },
        { title: 'Телефон', value: 'phone', align: 'start', sortable: false },
        { title: 'Компания', value: 'company', align: 'start', sortable: false },
        { title: 'Специальность', value: 'jobTitle', align: 'start', sortable: false },
        { title: 'Интересы', value: 'interests', align: 'start', sortable: false },
      ],
      loading: false,
      isEditing: false,
      isAdding: false,
      nextId: 50,
      dialog: false,
      valid: false,
      selectedProfile: null,
      statusString: 'Не обработан',
      firstName: '',
      lastName: '',
      company: '',
      jobTitle: '',
      phone: '',
      email: '',
      interests: '',
    }
  },
  computed: {
    ...mapState('profiles', {
      profiles: (state) => state.profiles,
      loading: (state) => state.loading,
      error: (state) => state.error,
    }),
    getHeaders() {
      if (this.selectedItemName === 'all') {
        return [
          { title: 'Статус', value: 'status', align: 'start', sortable: false },
          ...this.headers,
        ]
      }
      return this.headers
    },
  },
  methods: {
    ...mapActions('profiles', ['fetchProfiles', 'addProfile', 'updateProfile', 'deleteProfile']),
    handleRowClick(profile) {
      if (this.selectedProfile === profile) {
        this.selectedProfile = null
      } else {
        this.selectedProfile = profile
        console.log(this.selectedProfile.id)
      }
    },
    addNewProfile(newProfile) {
      const profileWithId = { id: this.nextId, ...newProfile }
      this.nextId += 1
      this.addProfile(profileWithId)
      this.dialog = false
    },
    addProfileFromLocal() {
      this.selectedProfile = null
      this.isEditing = false
      this.dialog = true
    },
    updateProfileFromLocal() {
      this.isEditing = true
      this.selectedProfile = { ...this.selectedProfile }
      this.firstName = this.selectedProfile.firstName
      this.lastName = this.selectedProfile.lastName
      this.company = this.selectedProfile.company
      this.jobTitle = this.selectedProfile.jobTitle
      this.phone = this.selectedProfile.phone
      this.email = this.selectedProfile.email
      this.interests = this.selectedProfile.interests
      this.statusString = this.selectedProfile.status ? 'Обработан' : 'Не обработан'
      this.dialog = true
    },
    deleteProfileFromLocal() {
      if (confirm('Вы уверены, что хотите удалить этот профиль?')) {
        this.deleteProfile(this.selectedProfile.id)
      }
    },
    handleCancel() {
      this.dialog = false
      this.isEditing = false
      this.isAdding = false
      this.selectedProfile = null
      this.resetForm()
    },
    resetForm() {
      this.firstName = ''
      this.lastName = ''
      this.company = ''
      this.jobTitle = ''
      this.phone = ''
      this.email = ''
      this.interests = ''
      this.statusString = 'false'
    },
    handleSubmit() {
      const profiles = this.profiles || []
      const lastProfile = profiles.length > 0 ? profiles[profiles.length - 1] : null
      const newId = lastProfile ? lastProfile.id + 1 : 1

      const updatedProfile = {
        id: this.isEditing ? this.selectedProfile.id : newId,
        status: this.statusString === 'Обработан', // if Обработан, set true value, else false, cause we save true/false
        firstName: this.firstName.trim(),
        lastName: this.lastName.trim(),
        company: this.company.trim(),
        jobTitle: this.jobTitle.trim(),
        phone: this.phone.trim(),
        email: this.email.trim(),
        interests: this.interests.trim(),
      }

      if (this.isEditing) {
        this.updateProfile(updatedProfile)
      } else {
        this.addProfile(updatedProfile)
      }

      this.dialog = false
      this.selectedProfile = null
    },
    getTitle() {
      switch (this.selectedItemName) {
        case 'all':
          return 'Все'
        case 'processed':
          return 'Обработанные'
        case 'unprocessed':
          return 'Не обработанные'
        default:
          return 'Все'
      }
    },
    filteredProfiles() {
      switch (this.selectedItemName) {
        case 'all':
          return this.profiles
        case 'processed':
          return this.profiles.filter((item) => item.status)
        case 'unprocessed':
          return this.profiles.filter((item) => !item.status)
        default:
          return this.profiles
      }
    },
    refreshProfiles() {
      this.loading = true
      this.fetchProfiles()
      setTimeout(() => {
        this.loading = false
      }, 3000)
    },
  },
  mounted() {
    this.fetchProfiles()
  },
}
</script>
<style>
.selected-row {
  background-color: #e0e0e0;
}
</style>
