<template>
    <v-container>
        <v-card 
        class="pa-9"
        color="#C0C0C0"
        >
            <!-- Top of table -->
            <template v-slot:top>
                <v-row>
                  <v-col cols="6">
                    <!-- Search Box -->
                   <form v-on:submit.prevent="searchItem">
                      <v-icon icon="fa:fas fa-search"></v-icon>
                      <v-text-field
                        v-model             ="search"
                        placeholder         = "Search admins ..."
                        class               = "mx-4 dark--text text-body-2 px-5"
                        clearable
                        solo
                        filled
                        outlined
                        dense
                        flat
                        prepend-icon        = "mid-refresh"
                        append-icon         = "fa:fas fa-search"
                        background-color    = "grey lighten-3"
                        color               = "dark"
                        @click:append       = "searchItem"
                        @click:prepend      ="() => readDataWithLimit(1, itemsPerPage)"
                        @click:clear        ="readDataWithLimit(1, itemsPerPage)"
                      >
                      <v-icon icon="fa:fas fa-search"></v-icon>
                      </v-text-field>
                    </form>
                  </v-col>
                  <v-col cols="6" align="right">
                    <v-btn
                      rounded
                      depressed
                      link
                      class   = "primary"
                      :to     = "'/create-admin'"
                      large
                    >
                      <v-icon>add</v-icon>
                      Create New
                    </v-btn>
                  
                  </v-col>
                </v-row>
              </template>
              <!-- End of top -->
              <template v-slot:no-data>
                <v-row>
                  <v-col cols="12" align="center" class="dark--text my-15">
                    <v-icon>info</v-icon> <p class="font-italic">{{ "no_data" }}</p>
                  </v-col>
                </v-row>
            </template>
            <v-table
            fixed-header
            height="300px"
            justify="center"
            >
                <thead>
                    <tr>
                    <th class="text-left py-4 pe-9">
                        Name
                    </th>
                    <th class="text-left py-4 pe-9">
                        Calories
                    </th>
                    <th class="text-left py-4 pe-9">
                        Price
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="item in desserts"
                    :key="item"
                    >
                    <td class="pe-9 py-6">{{ item.name }}</td>
                    <td class="pe-9 py-6">{{ item.calories }}</td>
                    <td class="pe-9 py-6">{{ item.price }}</td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>
  </v-container>
</template>
  <script>
  export default {
    data () {
      return {
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            price: 40000,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            price: 60000,
          },
          {
            name: 'Eclair',
            calories: 262,
            price: 80000,
          },
          {
            name: 'Cupcake',
            calories: 305,
            price: 56000,
          },
          {
            name: 'Gingerbread',
            calories: 356,
            price: 73600,
          },
        ],
      }
    },
  }
</script>