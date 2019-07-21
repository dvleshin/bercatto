<template>
  <section class="user-card-container">
    <div class="user-card">
      <div class="img-container">
        <img :src="user.profileImg" />
      </div>
      <div class="content-container">
        <div class="user-name">{{user.fullName}}</div>
        <div>
          <v-card-actions class="pa-3">
            {{user.fullName}}'s Rate
            <v-rating
              :value="rating"
              color="yellow darken-3"
              background-color="grey darken-1"
              empty-icon="$vuetify.icons.ratingFull"
              ripple
              readonly
              size = "40px"
            ></v-rating>
          </v-card-actions>
        </div>
      </div>
    </div>
    <!-- <v-card>
      <v-layout>
        <v-flex xs5>
          <v-img :src="user.profileImg" height="125px" contain></v-img>
        </v-flex>
        <v-flex xs7>
          <v-card-title primary-title>
            <div>
              <div class="headline">{{user.fullName}}</div>
              <!-- <div>{{user.fullName}}</div>
              <div>{{user.adress.city}}</div> 
              
            </div>
          </v-card-title>
        </v-flex>
      </v-layout>
      <v-divider light></v-divider>
      <v-card-actions class="pa-3">
        {{user.fullName}}'s Rate
        <v-spacer></v-spacer>
        <v-rating
          :value="rating"
          color="yellow darken-3"
          background-color="grey darken-1"
          empty-icon="$vuetify.icons.ratingFull"
          ripple
          readonly
        ></v-rating>
      </v-card-actions>
    </v-card>-->
  </section>
</template>

<script>
export default {
  created() {
    console.log("kjh");
  },
  props: ["user"],
  methods: {},
  computed: {
    rating() {
      console.log();

      if (this.user.reviews.length) {
        const rating = this.user.reviews.reduce((accumulator, review) => {
          return accumulator + review.rating;
        }, 0);
        return rating / this.user.reviews.length;
      } else return 0;
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped src="../styles/components/user-card.scss">
</style>