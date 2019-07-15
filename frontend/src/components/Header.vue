<template>
  <v-toolbar>
    <v-toolbar-items v-if="!loggedInUser" class="hidden-sm-and-down">
      <v-text-field
                  label="User Name"
                  v-model="userName"
                  required
                  
                ></v-text-field>
      
    <v-text-field
                  label="Password"
                  v-model="password"
                  required
                  
                ></v-text-field>

                <v-avatar
          :tile="tile"
          :size="avatarSize"
          color="grey lighten-4"
          v-if="loggedInUser"
        >
          <img :src="loggedInUser.profileImg">
        </v-avatar>
      
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
 created(){
  
 },

 data() {
   return {
     password: '',
     userName: '',
     loggedInUser: null
   }
 },
};
</script>

<style lang="scss" scoped src="../styles/components/header.scss">

</style>