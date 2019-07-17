<template>
    <div class="text-xs-center" v-if="!loggedInUser">
        <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" color="#fff" size="30px" class="icon-align">account_circle</v-icon>
          </template>

          <v-card>
            <div v-if="!loggedInUser">
              <v-form class="form">
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
      </div>
</template>

<script>
export default {
    
}
</script>