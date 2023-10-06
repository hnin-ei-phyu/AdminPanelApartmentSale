<template>
  <div class="admin-edit">
    <v-container>
      <v-row v-if="loading">
        <v-col cols="12" align="center">
          <v-progress-circular
            indeterminate
            color="primary"
            class="mt-15"
          ></v-progress-circular>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12">
          <v-card class="snow">
            <v-card-title class="dark--text subtitle-1 font-weight-bold">
              <v-btn
                depressed
                class="secondary mx-2"
                dark
                @click="() => this.$router.go(-1)"
              >
                <v-icon>keyboard_arrow_left</v-icon>
                to admin list
              </v-btn>
              <v-spacer></v-spacer>
              <v-alert
                v-if="success"
                dense
                type="success"
                class="text-body-2 mx-3"
              >
                Data sucessfully updated
              </v-alert>
              <v-btn
                depressed
                class="primary"
                dark
                :loading="loading"
                @click="handleUpdate()"
              >
                <v-icon>save</v-icon>
                update data
              </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="mt-3">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    filled
                    outlined
                    background-color="#fff"
                    label="Username"
                    color="primary darken-3"
                    v-model="username"
                  >
                  {{ username }}
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="8">
                  <v-text-field
                    filled
                    outlined
                    background-color="#fff"
                    label="password"
                    color="primary darken-3"
                    v-model="password"
                  >
                  {{ password }}
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                <v-select
                :items="['0','1','2']"
                label="select Role"
                outlined
                background-color="#fff"
                color="primary darken-3"
                v-model="role"
                ></v-select>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Admin from "../../api/admin"
export default {
  name: "AdminEdit",
  data: function () {
    return {
      loading  : false,
      username : this.username,
      password : this.password,
      role     : this.role,
      success  : null,
    };
  },
  methods: {
    handleUpdate: async function () {
      this.loading = true;

      let admin = new Admin(this.$route.params.id);
      let updateData = {
        username : this.username,
        password : this.password,
        role : this.role,
      };

      try {
        await admin.updateInfo(updateData,this.token);
        this.success = true;
        this.loading = false;
        this.$router.push("/admins")
        setTimeout(() => {
          this.success = false;
        }, 5000);
      } catch (error) {
        this.loading = false;
        console.log("Error : ",error)
      }
    },
  },
  created: async function () {
    this.loading = true;

    let data;
    try {
      let admin = new Admin(this.$route.params.id);
      let result = await admin.getInfo(this.token);
      data = result.data;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      console.log("Error : ",error);
    }

    this.username = data.username
    this.password = data.password
    this.role = data.role
  },
  computed: {
    token: function () {
      return this.$store.state.currentUser.token;
    },
  },
};
</script>