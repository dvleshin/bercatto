<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <div v-on="on">
          <slot></slot>
        </div>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Sign up</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="Enter your full name*"
                  v-model="user.fullName"
                  append-icon="person"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email*" v-model="user.email" append-icon="email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="user.password"
                  :append-icon="show1 ? 'visibility' : 'visibility_off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Password*"
                  hint="At least 8 characters"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="*Country"
                  v-model="user.adress.country"
                  append-icon="map"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="*City"
                  v-model="user.adress.city"
                  append-icon="my_location"
                  required
                ></v-text-field>
              </v-flex>
              <v-btn
            :loading="loading"
            :disabled="loading"
            color="blue-grey"
            class="white--text"
            @click="loader = 'loading3'"
          >
            Upload Image
            <v-icon right dark>cloud_upload</v-icon>
          </v-btn>
          <v-btn @click="onSignUp">SignUp</v-btn>
            </v-layout>
          </v-container>
          <v-spacer></v-spacer>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Swal from 'sweetalert';
export default {
  props: {
    close: String,
  },
  data() {
    return {
      dialog: false,
      user: {
        adress: {
          country: "Israel",
          city: "Tel Aviv"
        },
        fullName: "Randall Lucas",
        email: "admin3@admin.com",
        password: "1234",
        isAdmin: false,
        profileImg:
          "https://res.cloudinary.com/dbcg46m3l/image/upload/v1563216566/barcatto/user_male2-512_vsjdfm.png",
        reviews: [],
        arenas: []
      },
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 4 || "Min 4 characters"
      },
      loader: null,
      loading: false,
      show1: false,
    };
  },
  methods: {
    onSignUp(){
      this.$store.dispatch({ type: "doSignup", userCred: this.user }).then(() => {
        this.dialog = false
        Swal.fire({
          position: "top-end",
          type: "success",
          title: "Welcome! you have signed up successfully.",
          showConfirmButton: true,
          timer: 2000
        });
      }); 
    }
  },
  watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)
        this.loader = null
      }
    }
};
</script>
<style lang="css" scoped>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>