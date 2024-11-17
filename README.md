# Profiles Managment Application

This is a robust profiles managment RestAPI application built with Vue 3 and Vite, Vuex, Vuetify 3. The application allows users to add, update, delete, sort, filter, paginate profiles.

## Screenshot
![image](https://github.com/user-attachments/assets/260cd055-19eb-4daa-8e03-64222a4c9300)

## Deploy link
[Profiles Management App by Pikuza Marie](https://profile-management-by-marie.netlify.app/)

## Features

1. **CRUD operations with profiles**
   - Users can add** new profiles to the existing API by clicking on 'Создать' option in 'Действия'.
   - Users can update** individual profiles by selecting a profile and then clicking on 'Изменить' option in 'Действия'.
   - Users can delete individual profiles by selecting a profile and then clicking on 'Удалить' option in 'Действия'.  
     ** Fields of the create/update form must correspond to validation rules.

2. **Filter profiles**
   - Users can filter profiles by status field using left sidebar options 'Все', 'Обработанные', 'Не обработанные'.
   - Users can filter profiles by filling in filter parameters in right filter sidebar.
   
4. **Sort profiles**
   - Users can sort profiles by clicking on 'Имя' or 'Фамилия' table header item.

5. **Paginate profiles**
   - Users can choose amount of profiles displayed on one page (5, 10, 20, 50, all).
   - Users can switch between pages using arrows.
     
## Built With
- **Vue 3** - the progressive JavaScript framework.
- **Vite** - A build tool that aims to provide a faster and leaner development experience for modern web projects.
- **Vuex** - state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application.
- **Vuetify 3** - collection of UI components which maintain a consistent style throughout your application with enough customization options to meet any use-case.

## Getting Started

To get started with this project, follow these steps:

### Prerequisites

Ensure you have the following installed on your machine:
- Node.js (version 18 or higher), the project is build with **20.18.0 Node.js** version

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
