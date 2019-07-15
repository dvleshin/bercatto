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
                <v-text-field label="Enter your full name" v-model="user.fullName" required></v-text-field>
                <v-text-field label="Enter your e-mail address" v-model="user.email" required></v-text-field>
                <v-text-field label="Country" v-model="user.adress.country" required></v-text-field>
                <v-text-field label="City" v-model="user.adress.city" required></v-text-field>
                <v-text-field
                  v-model="user.password"
                  :append-icon="show1 ? 'visibility' : 'visibility_off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Enter your password"
                  hint="At least 8 characters"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>
                <v-layout justify-space-between>
                  <v-btn @click.prevent="submit">SignUp</v-btn>
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
      user: {
        adress: {
          country: "Israel",
          city: "Tel Aviv"
        },
        fullName: "Dmitry Leshin",
        email: "admin3@admin.com",
        password: "abcd",
        isAdmin: false,
        profileImg: "https://res.cloudinary.com/dbcg46m3l/image/upload/v1563216566/barcatto/user_male2-512_vsjdfm.png",
        reviews: []
      },
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 4 || "Min 4 characters",
      },
      show1: false,
    };
  },

  methods: {
    submit() {
      const user = this.user;
      this.$store.dispatch({ type: "doSignup", userCred: user }).then(() => {
        // Swal.fire({
        //   position: "top-end",
        //   type: "success",
        //   title: "Welcome! you have signed up successfully.",
        //   showConfirmButton: true,
        //   timer: 2000
        // });
        this.$router.push("/");
      });
    }
  }
};
</script>

<style scoped>
body {
  background-image: url("http://wallpaperping.com/wp-content/uploads/2018/05/704532.jpg");
  background-size: cover;
}
</style>
