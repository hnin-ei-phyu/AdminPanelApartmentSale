<template>
    <div class="app-bar">
      <!-- main application bar containing navigation -->
      <v-app-bar app class="primary" flat>
        <NavigationDrawer />
        <p class="font-weight-bold mt-4 white--text">
          {{ $route.name }}
        </p>
      </v-app-bar>
    </div>
  </template>
  <script>
  import NavigationDrawer from "@/components/NavigationDrawer.vue";
  export default {
    name: "AppBar",
    components: { NavigationDrawer },
  };
  </script>
  