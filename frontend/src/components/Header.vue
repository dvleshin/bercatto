<template>
  <header class="flex">
    <div class="logo">
      <p>
        <v-icon @click="goMain" color="#fff" size="20px">home</v-icon> Barcatto
      </p>
    </div>

    <div class="nav-bar flex">
      <div v-if="loggedInUser" class="user-menu">
        <v-icon @click="addItem">add</v-icon>
        arenas: ({{loggedInUser.arenas.length}})

        <v-avatar size="60px">
          <img :src="loggedInUser.profileImg" />
        </v-avatar>
        <button @click="go">GO</button>
        <v-icon @click.prevent="onLogOut" color="#fff" size="30px">exit_to_app</v-icon>
      </div>
      <div class="login-area" v-if="!loggedInUser">
        <ul>
          <li>
            <Signup></Signup>
          </li>
          <li class="login flex">
            <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
              <template v-slot:activator="{ on }">
                <div v-on="on">
                  <v-icon color="#fff" size="25px">account_circle</v-icon>login
                </div>
              </template>
              <v-card>
                <div>
                  <v-form class="form flex">
                    <v-text-field label="E-mail" v-model="user.email" required prepend-icon="email"></v-text-field>
                    <v-text-field
                      label="Password"
                      type="password"
                      v-model="user.password"
                      required
                      prepend-icon="lock"
                    ></v-text-field>
                    <v-btn @click.prevent="onLogin" color="#5774ff" outline>LogIn</v-btn>
                  </v-form>
                </div>
              </v-card>
            </v-menu>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import userService from "../services/UserService.js";
import Signup from "../components/SignUp-v2.vue";
export default {
  created() {
    this.loggedInUser = this.$store.getters.loggedInUser;

    if (!this.loggedInUser) {
      this.$store
        .dispatch({
          type: "getUserById",
          userId: JSON.parse(sessionStorage.loggedInUser)._id
        })
        .then((user)=> {
          
          this.loggedInUser = user;
          this.$store.dispatch({
            type: "setLoggedInUser",
            userCreds: user
          });
        })}
  
  },
  data() {
    return {
      user: {
        email: "admin3@admin.com",
        password: "1234"
      },
      loggedInUser: null,
      menu: false,
    };
  },
  methods: {
    go() {
      this.$router.push(this.loggedInUser.arenas[0].url)
    },
    goMain() {
      this.$router.push("/");
    },
    onLogin() {
      this.$store
        .dispatch({ type: "doLogin", userCred: this.user })
        .then(res => {
          // this.loggedInUser = this.$store.getters.loggedInUser;
           this.loggedInUser = this.$store.getters.loggedInUser;

    if (!this.loggedInUser) {
      this.$store
        .dispatch({
          type: "getUserById",
          userId: JSON.parse(sessionStorage.loggedInUser)._id
        })
        .then((user)=> {
          
          this.loggedInUser = user;
          this.$store.dispatch({
            type: "setLoggedInUser",
            userCreds: user
          });
        })}
          console.log('Login successful');
        });
    },
    onLogOut() {
      this.$store
        .dispatch({ type: "doLogout" })
        .then((this.loggedInUser = null));
    },
    addItem(){
      this.$router.push('/add')
    }
  },
  computed: {
    arenasUrls() {
      return this.loggedInUser.arenas.map(arena => arena.url);
    }
  },
  components: {
    Signup,
  }
};
</script>

<style lang="scss">
@import "../styles/components/header.scss";
</style>