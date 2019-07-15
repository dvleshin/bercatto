<template>
  <v-container fluid fill-height class="loginOverlay">
    <v-layout flex align-center justify-center>
      <v-flex xs12 sm4 elevation-6>
        <v-toolbar class="pt-5 blue darken-4">
          <v-toolbar-title class="white--text">
            <h4>SignUp</h4>
          </v-toolbar-title>
        </v-toolbar>
        <v-card>
          <v-card-text class="pt-4">
            <div>
              <v-form ref="form">
                <v-text-field
                  label="Enter your full name"
                  v-model="user.fullName"
                  required
                ></v-text-field>
                <v-text-field
                  label="Enter your e-mail address"
                  v-model="user.email"
                  required
                ></v-text-field>
                <v-text-field
                  label="Country"
                  v-model="user.adress.country"
                  required
                ></v-text-field>
<v-text-field
                  label="City"
                  v-model="user.adress.city"
                  required
                ></v-text-field>
                <v-text-field
                  label="Enter your password"
                  v-model="user.password"
                  min="8"
                  counter
                  required
                ></v-text-field>
                <v-layout justify-space-between>
                  <v-btn
                    @click.prevent="submit"
                
                  >SignUp</v-btn>
                </v-layout>
              </v-form>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: {adress:{}}
    }
  },

  methods: {
    submit() {
      const user = this.user
      user.reviews = []
        this.$store.dispatch({ type: "signup", userCred: {user} }).then(() => {
        // Swal.fire({
        //   position: "top-end",
        //   type: "success",
        //   title: "The toy is saved",
        //   showConfirmButton: true,
        //   timer: 2000
        // });
        this.$router.push("/");
    })
  },
}
}

</script>

<style scoped>
body{
  background-image: url("http://wallpaperping.com/wp-content/uploads/2018/05/704532.jpg");
  background-size: cover;
}
</style>
