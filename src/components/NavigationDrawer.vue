<template>
  <div class="navigation-drawer">
    <v-app-bar-nav-icon dark @click="drawer = !drawer"></v-app-bar-nav-icon>
    <!-- main navigation drawer -->
    <v-navigation-drawer v-model="drawer" color="#C0C0C0" app light absolute temporary>
      <v-divider></v-divider>
          <v-list>
          <v-list-item-group v-model="model">
            <v-list-item>
              <v-img
                max-height="55"
                max-width="55"
                src="../assets/logo.png"
              ></v-img> 
            </v-list-item>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :to="item.path"
              active-class="white primary--text"
              class="py-1"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="font-weight-bold dark--text">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
          </v-list>

            <template v-slot:append>
              <div class="pa-2">
                <v-btn
                 block 
                 color="#7FFFD4"
                 link 
                 :href="'/auth/login'"
                >
                  Logout
                </v-btn>
              </div>
            </template>
      </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'NavigationDrawer',
    data: () => ({
      dialog : false,
      drawer: false,
      items: [
        {
          icon: 'mdi-account',
          title: 'ADMINS',
          path: "/admins"
        },
        {
          icon: 'mdi-account',
          title: 'SELLERS',
          path: "/sellers"
        },
        {
          icon: 'mdi-account',
          title: 'BUYERS',
          path: "/buyers"
        },
        {
          icon: 'mdi-widgets',
          title: 'MERCHANDISES',
          path: "/merchandises"
        },
        {
          icon: 'mdi-message-text',
          title: 'SMS',
        },
      ],
      model: 1,
    }),

    methods: {
      
    }
}
</script>



