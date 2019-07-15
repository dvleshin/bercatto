<template>
<section class="item">
    <v-card max-width="300">
        <v-img @click.stop ="seeItem"
          class="white--text card-image"
          height="200px"
          :src="item.imgUrl[0]"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title>
          <div>
             <h2>{{item.name}}</h2>
            <span class="grey--text">Added {{item.uploadedAt}}</span><br>
            <span> {{item.condition}}</span><br>
            <span>{{item.description}}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn @click="goToUserProfile(item.ownerId)" flat color="orange">See dealer's profile</v-btn>
          <v-btn flat color="orange" @click="goToArena(item.Id)">Go To Arena!</v-btn>
        </v-card-actions>
      </v-card>
  <button v-if="loggedInUser._id===item.ownerId" class="delete" @click="remove(item._id)">X</button> <!--v-if user is the owner -->
</section>
</template>
<script>
export default {
  props: ["item"],
  created() {
    this.loggedInUser = JSON.parse(sessionStorage.loggedInUser).user
  },
  data() {
    return {
      loggedInUser:null
    }
  },
  methods: {
    remove(itemId) {
      this.$emit('remove' , itemId)
    },
    seeItem() {
       this.$router.push(`item/${this.item._id}`)
    },
    goToUserProfile(){
       this.$router.push(`user/${this.item.ownerId}`);
    },
    goToArena(){
       const loggedInUser = JSON.parse(sessionStorage.loggedInUser).user
       if(!loggedInUser) return //swal
       this.$router.push(`arena?id=${this.item._id}`);
    }
  },
  
};
</script>

<style lang="scss" scoped src="../styles/components/main-item-preview.scss">
</style>
