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
              <v-form v-model="valid" ref="form">
                <v-text-field
                  label="Enter your full name"
                  v-model="fullName"
                  :rules="fullNameRules"
                  required
                ></v-text-field>
                <v-text-field
                  label="Enter your e-mail address"
                  v-model="email"
                  :rules="emailRules"
                  required
                ></v-text-field>
                <v-text-field
                  label="Country"
                  v-model="country"
                  :rules="countryRules"
                  required
                ></v-text-field>
<v-text-field
                  label="City"
                  v-model="city"
                  :rules="cityRules"
                  required
                ></v-text-field>
                <v-text-field
                  label="Enter your password"
                  v-model="password"
                  min="8"
                  :append-icon="e1 ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (e1 = !e1)"
                  :type="e1 ? 'password' : 'text'"
                  :rules="passwordRules"
                  counter
                  required
                ></v-text-field>
                <!-- <v-container fluid grid-list-xl>
                  <v-layout wrap align-center>
                    <v-flex xs12 sm6 d-flex>
                      <v-select :items="items" label="Country"></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 d-flex>
                      <v-select :items="items" label="City"></v-select>
                    </v-flex>
                  </v-layout>
                </v-container> -->

                <v-layout justify-space-between>
                  <v-btn
                    @click="submit"
                    :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
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
// export default {
//   data: () => ({
//     items: ["Foo", "Bar", "Fizz", "Buzz"]
//   })
// };
</script>

<style>
body {
  background-image: url("http://wallpaperping.com/wp-content/uploads/2018/05/704532.jpg");
  background-size: cover;
}
</style>
