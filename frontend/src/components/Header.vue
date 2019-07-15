<template>
 
  <v-toolbar>
    <v-form class="form">
    <v-toolbar-items v-if="!loggedInUser" class="hidden-sm-and-down">
    
      <v-text-field
                  label="User Name"
                  v-model="user.userName"
                  required
                  
                ></v-text-field>
      
    <v-text-field
                  label="Password"
                  v-model="user.password"
                  required
                  
                ></v-text-field>

    </v-toolbar-items>
      <v-btn
        @click.prevent="login"
        
      >LogIn</v-btn>
    </v-form>

     
      <v-avatar :tile="tile" :size="avatarSize" color="grey lighten-4" v-if="loggedInUser">
        <img :src="loggedInUser.profileImg" />
      </v-avatar>
  </v-toolbar>
</template>

<script>
import userService from '../services/UserService.js'
export default {
 created(){
  this.loggedInUser = this.$store.getters.loggedInUser
  console.log(this.loggedInUser);
 },

 data() {
   return {
   user:{userName:'', password:''},
     
     loggedInUser: null
   }
 },
 methods: {
     login() {
            // console.log(this.user)
            // userService.login(this.user)
            //     .then(res => {
            //         console.log('res logim cmp 22', res);
            //         this.$router.push('/')
            //     })
                
        }
}
};
</script>

<style lang="scss" scoped src="../styles/components/header.scss">
</style>