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
            <span class="grey--text">Added {{humanTime(item.uploadedAt)}}</span><br>
            <span> {{item.condition}}</span><br>
            <span>{{item.description}}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn @click="goToUserProfile(item.ownerId)" flat color="orange">See dealer's profile</v-btn>
          <v-btn flat color="orange" @click="goToArena(item.Id)">Go To Arena!</v-btn>
        </v-card-actions>
      </v-card>
  <img src="../../public/img/trending.png" v-if="item.views>50" class="trending"> 

  <v-icon v-if="loggedInUserId&&loggedInUserId===item.ownerId" class="delete" @click="remove(item._id)">remove</v-icon> <!--v-if user is the owner -->
</section>
</template>
<script>
import moment from 'moment'
export default {
  props: ["item"],
  created() {
    if(JSON.parse(sessionStorage.loggedInUser)) {
  this.loggedInUserId = JSON.parse(sessionStorage.loggedInUser)._id
    }
  },
  data() {
    return {
      moment:moment,
      loggedInUserId:null
    }
  },
  methods: {
    humanTime(timestamp){
return moment(timestamp).fromNow()
    },
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
          if(!sessionStorage.loggedInUser) return 

       
       this.$router.push(`arena?id=${this.item._id}`);
    }
  },
  
};
</script>

<style lang="scss" scoped src="../styles/components/main-item-preview.scss">
</style>
