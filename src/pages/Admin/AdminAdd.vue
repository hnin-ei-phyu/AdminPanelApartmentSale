<template>
    <div class="admin-add">
      <v-container>
        <!-- <v-row v-if="loading">
          <v-col cols="12" align="center">
            <v-progress-circular
              indeterminate
              color="primary"
              class="mt-15"
            ></v-progress-circular>
          </v-col>
        </v-row> -->
        <v-row >
          <v-col cols="12">
            <v-card class="snow" height="800px">
              <v-card-title class="dark--text subtitle-1 font-weight-bold">
                <v-btn
                  depressed
                  class="info mx-2"
                  dark
                  @click="() => this.$router.go(-1)"
                >
                  <v-icon>keyboard_arrow_left</v-icon>
                  to admin list
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  depressed
                  class="success mx-2"
                  dark
                  :loading="loading"
                  @click="handleCreate()"
                >
                  <v-icon>save</v-icon>
                  create data
                </v-btn>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="mt-3 text-center">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      filled
                      outlined
                      background-color="#fff"
                      label="Username"
                      color="primary darken-3"
                      v-model="username"
                    >
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      filled
                      outlined
                      background-color="#fff"
                      label="email"
                      color="primary darken-3"
                      v-model="email"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      filled
                      outlined
                      background-color="#fff"
                      label="password"
                      color="primary darken-3"
                      v-model="password"
                    >
                    </v-text-field>
                  </v-col>

                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      filled
                      outlined
                      background-color="#fff"
                      label="Role"
                      color="primary darken-3"
                      v-model="role"
                    >
                    </v-text-field>
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
      name : "Admin-Add",
      data : function() {
        return {
          loading : false,
          username : null,
          email : null,
          password : null,
          role : 0
        }
      },
      methods : {
        handleCreate : async function() {
          this.loading = true;
          let admin = new Admin()
          let adminData = {
            username : this.username,
            email : this.email,
            password : this.password,
            role : this.role,
          }

          try {
            await admin.registerAdmin(adminData)
            this.$router.push("/admins")
          } catch (error) {
            console.log("Error : ", error)
            this.$store.dispatch("MAKE_ERROR","Cannot create Admin .")
          }
          this.loading = false ;
        }
      },
      computed : {
        token : function() {
            return this.$store.state.currentUser.token ;
        }
      }
    }
  </script>
  
  <style>
  
  </style>