<template>
  <header>
    <div v-if="loggedInUser">
      <v-avatar size="48px">
        <img :src="loggedInUser.profileImg" />
      </v-avatar>
      <v-btn @click.prevent="onLogOut">LogOut</v-btn>
    </div>

    <div>
      <div class="text-xs-center">
        <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
          <template v-slot:activator="{ on }">
            <v-btn color="indigo" dark v-on="on">Menu as Popover</v-btn>
          </template>

          <v-card>
            <div v-if="!loggedInUser">
              <v-form class="form">
                <v-text-field label="E-mail" v-model="user.email" required prepend-icon="email"></v-text-field>
                <v-text-field label="Password" type="password" v-model="user.password" required prepend-icon="key"></v-text-field>
                <v-btn @click.prevent="onLogin" color="#5774ff">LogIn</v-btn>
              </v-form>
            </div>
          </v-card>
        </v-menu>
      </div>
    </div>
  </header>
</template>

<script>
import userService from "../services/UserService.js";
export default {
  created() {
    if (sessionStorage.loggedInUser)
      this.loggedInUser = JSON.parse(sessionStorage.loggedInUser);
    // this.loggedInUser = this.$store.getters.loggedInUser;
  },
  data() {
    return {
      user: {
        email: "admin3@admin.com",
        password: "1234"
      },
      loggedInUser: null
    };
  },
  methods: {
    onLogin() {
      this.$store
        .dispatch({ type: "doLogin", userCred: this.user })
        .then(res => {
          // this.loggedInUser = this.$store.getters.loggedInUser;
          this.loggedInUser = JSON.parse(sessionStorage.loggedInUser);
          console.log("Login successful");
        });
    },
    onLogOut() {
      this.$store
        .dispatch({ type: "doLogout" })
        .then((this.loggedInUser = null));
    }
  }
};
</script>

<style lang="scss">
@import "../styles/components/header.scss";
</style>