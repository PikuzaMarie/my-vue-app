<template>
  <div class="container">
    <v-sheet elevation="4" class="d-flex flex-md-column pt-5 pl-8 pr-5">
      <!-- Toolbar with title, refresh btn and dropdown menu -->
      <v-toolbar color="white" class="d-flex align-center pl-4">
        <div class="d-flex align-center">
          <v-toolbar-title class="text-h6">{{ getActiveTabTitle() }}</v-toolbar-title>
          <v-btn icon @click="refreshProfiles" color="primary">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </div>
        <v-spacer></v-spacer>
        <v-menu open-on-hover close-on-content-click location="bottom">
          <!--slot for dialog activation-->
          <template v-slot:activator="{ props }">
            <v-btn
              variant="elevated"
              color="primary"
              append-icon="mdi-menu-down"
              v-bind="props"
              class="pl-13 pr-13 text-body-2"
            >
              Действия
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="openCreateDialog" class="mt-1 mr-2 mb-1 ml-2">
              <v-list-item-title class="text-body-2">Создать</v-list-item-title>
            </v-list-item>
            <v-list-item
              @click="selectedProfile ? openUpdateDialog(selectedProfile) : null"
              class="mt-1 mr-2 mb-1 ml-2"
            >
              <v-list-item-title class="text-body-2">Изменить</v-list-item-title>
            </v-list-item>
            <v-list-item
              @click="selectedProfile ? openDeleteDialog() : null"
              class="mt-1 mr-2 mb-1 ml-2"
            >
              <v-list-item-title class="text-body-2">Удалить</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
      <!--Confirm deletion dialog-->
      <v-dialog v-model="showDeleteDialog" max-width="400px" persistent>
        <v-card>
          <v-card-title class="pt-4 pl-6">
            <span class="headline">Подтверждение удаления</span>
          </v-card-title>
          <v-card-text> Вы уверены, что хотите удалить этот профиль? </v-card-text>
          <v-card-actions>
            <v-btn
              variant="elevated"
              color="white"
              @click="handleCancelDelete"
              class="mb-1 text-body-2"
            >
              Отмена
            </v-btn>
            <v-btn
              variant="elevated"
              color="primary"
              @click="handleConfirmDelete"
              class="mb-1 text-body-2"
            >
              Удалить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--Error alert if any occur on create/update/delete profiles-->
      <v-alert
        v-if="error"
        color="error"
        variant="tonal"
        border="start"
        border-color="error"
        density="compact"
        closable
      >
        {{ error }}
      </v-alert>
      <!-- Data Table with profiles and pagination-->
      <v-data-table
        :headers="getHeaders"
        :items="filteredProfilesForTable()"
        :loading="loading"
        items-per-page-text="Количество элементов на странице:"
        :items-per-page-options="[5, 10, 20, 50, -1]"
        :items-per-page="5"
        page-text="{0}-{1} из {2}"
        class="d-flex flex-column flex-md-grow-1"
        @click:row="handleRowClick"
      >
        <template v-slot:item="{ item }">
          <tr @click="handleRowClick(item)" :class="{ 'selected-row': selectedProfile === item }">
            <td v-if="selectedTabName === 'all'">
              <v-icon v-if="item.status" color="primary" size="28px">
                mdi-cloud-check-variant
              </v-icon>
              <v-icon v-else color="error" size="28px">mdi-cloud-alert</v-icon>
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
      <v-dialog v-model="showCreateUpdateDialog" max-width="600px" persistent>
        <v-card>
          <v-card-title class="pt-4 pl-6">
            <span class="headline">{{ isEditing ? 'Изменить профиль' : 'Создать профиль' }}</span>
          </v-card-title>
          <v-card-text>
            <!-- Profile form -->
            <v-form ref="form" v-model="isFormValid" @submit.prevent="handleSubmit">
              <v-select
                v-if="isEditing"
                v-model="statusString"
                label="Статус"
                :rules="[rules.required]"
                :items="['Не обработан', 'Обработан']"
                density="compact"
                variant="solo"
              >
              </v-select>
              <v-text-field
                v-model="firstName"
                label="Имя"
                :rules="[rules.required]"
                density="compact"
                variant="solo"
              ></v-text-field>
              <v-text-field
                v-model="lastName"
                label="Фамилия"
                :rules="[rules.required]"
                density="compact"
                variant="solo"
              ></v-text-field>
              <v-text-field
                v-model="company"
                label="Компания"
                :rules="[rules.required]"
                density="compact"
                variant="solo"
              ></v-text-field>
              <v-text-field
                v-model="jobTitle"
                label="Специальность"
                :rules="[rules.required]"
                density="compact"
                variant="solo"
              ></v-text-field>
              <v-text-field
                v-model="phone"
                label="Телефон"
                :rules="[rules.required, rules.phone]"
                density="compact"
                variant="solo"
              ></v-text-field>
              <v-text-field
                v-model="email"
                label="E-mail"
                :rules="[rules.required, rules.email]"
                density="compact"
                variant="solo"
              ></v-text-field>
              <v-text-field
                v-model="interests"
                label="Интересы"
                density="compact"
                variant="solo"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              variant="elevated"
              color="white"
              @click="handleCancelCreateUpdate"
              class="mb-1 text-body-2"
            >
              Отмена
            </v-btn>
            <v-btn
              variant="elevated"
              color="primary"
              :disabled="!isFormValid"
              @click="handleSubmit"
              class="mb-1 text-body-2"
            >
              {{ isEditing ? 'Сохранить изменения' : 'Добавить профиль' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-sheet>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    selectedTabName: String,
  },
  data() {
    return {
      headers: [
        { title: 'Имя', value: 'firstName', align: 'start', sortable: true },
        { title: 'Фамилия', value: 'lastName', align: 'start', sortable: true },
        { title: 'Компания', value: 'company', align: 'start', sortable: false },
        { title: 'Специальность', value: 'jobTitle', align: 'start', sortable: false },
        { title: 'Телефон', value: 'phone', align: 'start', sortable: false },
        { title: 'E-mail', value: 'email', align: 'start', sortable: false },
        { title: 'Интересы', value: 'interests', align: 'start', sortable: false },
      ],
      isEditing: false,
      isAdding: false,
      showCreateUpdateDialog: false,
      showDeleteDialog: false,
      isFormValid: false,
      selectedProfile: null,
      statusString: 'Не обработан',
      firstName: '',
      lastName: '',
      company: '',
      jobTitle: '',
      phone: '',
      email: '',
      interests: '',
      rules: {
        required: (value) => !!value || 'Обязательное поле',
        phone: (value) => {
          const phoneRegex = /^[\d()\-+\s]+$/
          return (
            phoneRegex.test(value) ||
            'Номер телефона может содержать только цифры, (), -, + и пробелы'
          )
        },
        email: (value) => {
          const emailRegex = /^[a-zA-Z0-9]{3,}@[a-zA-Z]{3,}\.[a-zA-Z]{2,}$/
          return emailRegex.test(value) || 'Неправильный формат почты. Пример: abc258@domain.com'
        },
      },
    }
  },
  computed: {
    ...mapState('profiles', {
      profiles: (state) => state.profiles,
      loading: (state) => state.loading,
      error: (state) => state.error,
      filteredProfiles: (state) => state.filteredProfiles,
    }),
    getHeaders() {
      if (this.selectedTabName === 'all') {
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
    openCreateDialog() {
      this.selectedProfile = null
      this.isEditing = false
      this.showCreateUpdateDialog = true
    },
    openUpdateDialog() {
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
      this.showCreateUpdateDialog = true
    },
    handleCreateProfile(newProfile) {
      this.addProfile(newProfile)
      this.showCreateUpdateDialog = false
    },
    openDeleteDialog() {
      this.showDeleteDialog = true
    },
    handleConfirmDelete() {
      this.deleteProfile(this.selectedProfile.id)
      this.showDeleteDialog = false
    },
    handleCancelDelete() {
      this.showDeleteDialog = false
    },
    handleCancelCreateUpdate() {
      this.showCreateUpdateDialog = false
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
      const updatedProfile = {
        id: this.isEditing ? this.selectedProfile.id : '',
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
    getActiveTabTitle() {
      switch (this.selectedTabName) {
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
    filteredProfilesForTable() {
      switch (this.selectedTabName) {
        case 'all':
          return this.filteredProfiles
        case 'processed':
          return this.filteredProfiles.filter((item) => item.status)
        case 'unprocessed':
          return this.filteredProfiles.filter((item) => !item.status)
        default:
          return this.filteredProfiles
      }
    },
    refreshProfiles() {
      this.$store.commit('profiles/setLoading', true)
      this.fetchProfiles().finally(() => {
        this.$store.commit('profiles/setLoading', false)
      })
    },
  },
  mounted() {
    this.fetchProfiles()
  },
}
</script>
<style>
.container {
  display: flex;
  flex-direction: column;
  margin: 70px 0 0 350px;
}
thead tr th span {
  font-weight: 600;
}
tbody tr:hover,
.selected-row {
  background-color: var(--color-hover);
}
.v-sheet {
  height: calc(100vh - 95px);
  /*64 + 10 + 21 = 95 
    header height 64px, 
    spacing b/w header and table 10px, 
    spacing b/w table and the bottom of the screen 21px*/
}
.v-data-table-footer {
  margin-top: auto;
}
</style>
