<template>
  <div class="login" style="background-color: rgb(198, 224, 245);">
 
 <HelloWorld>
  <v-container>

   <h1 class="text-center">Admin Login</h1>
   <v-card
       class="mx-auto mt-4"
       theme="dark"
       max-width="600"
       height="500"
     >

     <v-card-text align="center">
     
     <v-img class="my-5" width="180" :src="require('../../assets/logo.png')"></v-img>

       <v-text-field
         filled
         background-color    = "#fff"
         label               = "email"
         color               = "primary darken-3"
         v-model             = "email"
         type                = "text"
       ></v-text-field>

         
       <v-text-field
         filled
         background-color    = "#fff"
         label               = "password"
         :type               = "showPassword ? 'text' : 'password'"
         :append-icon        = "showPassword ? 'mdi-eye' : 'mdi-eye-off'"
         @click:append       = "showPassword = !showPassword"
         color               = "primary darken-3"
         v-model             = "password"
         class = "mb-8"
       >
       </v-text-field>

       <v-btn
         dark
         block
         rounded
         large
         background-color    = ""
         :loading  = "loading"
         @click    = "login"
       >
       login
       </v-btn>
       <!-- alertText-->
       <v-alert
       block
       v-if  = "error"
       type  = "error"
       class = "text-body-2 my-5"
       >
         {{ errorText }}
       </v-alert>
       
   </v-card-text>
 </v-card>
</v-container>

 </HelloWorld>
 
 
</div>
</template>

<script>
import Admin from "../../api/admin"
export default {
   name: 'Login',
 data: function() {
    return {
        email : null,
        password : null,
        showPassword : false,
        loading : false,
        error : false,
        errorText : null,
        success : false
    }
 },

 methods: {
       login : async function() { 
        try {
          this.loading = true;
          let adminObj = {
            email : this.email,
            password : this.password
          }        
          let admin = new Admin()
          let adminData = await admin.loginAdmin(adminObj)
          console.log(adminObj)
          this.error = false 
          this.success = true
          // this.saveCurrentAuth(adminData.data)      
          this.$router.push("/main");
          console.log(adminData)

        } catch (error) {
          this.error = true 
          this.loading = false 
          let status = error.response.status
          if(status === 400) {
            this.errorText = "Username or password Wrong !" 
          } else {
            this.errorText = "Server Error !"
          }
        }
       },
       
      //  saveCurrentAuth : async function(user) {
      //   //save auth token to localstorage 
      //   console.log("I want to go home!")
      //   localStorage.setItem("token",user.token)

      //   //save the current auth to global store
      //   this.$store.commit ("setCurrent",user)

      //   //continue to next page 
      //   setTimeout(()=>{
      //     this.$router.push("/main")
      //   },1000)
      //  }
 },
 computed : {
  currentUser : function() {
    return this.$store.state.currentUser
  }
 }
}
</script>
