<template>
  <v-toolbar>
    <v-form class="form" v-if="!loggedInUser">
      <v-toolbar-items class="hidden-sm-and-down">
        <v-text-field label="E-mail" v-model="user.email" required></v-text-field>

        <v-text-field label="Password" v-model="user.password" required></v-text-field>
      </v-toolbar-items>
      <v-btn @click.prevent="onLogin">LogIn</v-btn>
    </v-form>
    <div v-if="loggedInUser">
    <v-avatar size="48px">
      <img :src="loggedInUser.profileImg" />
    </v-avatar>
    <v-btn @click.prevent="onLogOut">LogOut</v-btn>
    </div>

  </v-toolbar>
</template>

<script>
import userService from "../services/UserService.js";
export default {
  created() {
    if(sessionStorage.loggedInUser)this.loggedInUser = JSON.parse(sessionStorage.loggedInUser)
    // this.loggedInUser = this.$store.getters.loggedInUser;    
  },
  
  data() {
    return {
      user: {
        email: "admin3@admin.com",
        password: "abcd"
      },
      loggedInUser: null
    };
  },
  methods: {
    onLogin() {
      this.$store
        .dispatch({type: "doLogin", userCred: this.user})
        .then((res) => {
          // this.loggedInUser = this.$store.getters.loggedInUser;
          this.loggedInUser = JSON.parse(sessionStorage.loggedInUser)
          console.log('Login successful');
        });
    },
    onLogOut(){
      this.$store.dispatch({type: 'doLogout'})
        .then(this.loggedInUser = null)
    }
  }
};
</script>

<style lang="scss" scoped src="../styles/components/header.scss">
</style>