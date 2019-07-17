<template>
  <section class="user-reviews">
    <v-card>
      <v-toolbar>
        <h1>Reviews</h1>

        <v-btn color="blue" dark small absolute bottom right fab @click="dialog = true">
          <v-icon>add</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text v-for="review in user.reviews" :key="review.id" class="grey lighten-5">
        From : {{review.firstName }} {{review.lastName }}
        {{review.txt}}
        {{humanTime(review.createdAt)}}
        Rate: {{review.rating}}
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Write Something About {{user.fullName}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="review.firstName" label="first name*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="review.lastName" label="last name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4></v-flex>
              <v-flex xs12>
                <v-text-field v-model="review.email" label="Email*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="review.txt" label="Review" hint="Dont forget to be nice"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-rating
                  v-model="review.rating"
                  background-color="black"
                  color="yellow accent-4"
                  dense
                  half-increments
                  hover
                  size="30"
                ></v-rating>
              </v-flex>
              <v-flex xs12 sm6></v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="saveReview">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import moment from 'moment'
export default {
  props: ["user"],
  methods: {
    humanTime(timestamp){
return moment(timestamp).fromNow()
    },
    saveReview() {
      this.dialog = false;
      const editedUser = { ...this.user };
      this.review.createdAt = Date.now();
      console.log(4);
      editedUser.reviews.push({...this.review});
      console.log(5);
      this.$store.dispatch({ type: "updateUser", user: editedUser });
      this.review = {rating :3}
    }
  },
  computed: {
    reviewsAmount() {
      return this.user.reviews.length
    }
  },
  data() {
    return {
      review: { rating: 3 },
      dialog: false
    };
  }
};
</script>
<style lang="scss" scoped src="../styles/components/user-reviews.scss">
</style>