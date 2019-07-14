<template>
<section class="item">
    <v-card max-width="300">
      
        <v-img @click.stop ="seeItem"
          class="white--text card-image"
          height="200px"
          :src="item.imgUrl"
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
          <v-btn flat color="orange">Go To Arena!</v-btn>
        </v-card-actions>
      </v-card>
  <button class="delete" @click="remove(item._id)">X</button> <!--v-if user is the owner -->
</section>
</template>
<script>
export default {
  props: ["item"],
  methods: {
    remove(itemId) {
      this.$emit('remove' , itemId)
    },
    seeItem() {
       this.$router.push(`item/${this.item._id}`)
    },
    goToUserProfile(ownerId){
       this.$router.push(`user/${this.item.ownerId}`);
    }
  },
  
};
</script>

<style lang="scss" scoped src="../styles/components/main-item-preview.scss">
</style>
