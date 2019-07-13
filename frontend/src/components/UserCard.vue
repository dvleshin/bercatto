<template>
  <section class="user-card">
    <v-card>
      <v-layout>
        <v-flex xs5>
          <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg" height="125px" contain></v-img>
        </v-flex>
        <v-flex xs7>
          <v-card-title primary-title>
            <div>
              <div class="headline">{{user.userName}}</div>
              <div>{{user.fullName}}</div>
              <div>{{user.adress.city}}</div>
               <v-btn color="red">Report</v-btn>
            </div>
          </v-card-title>
        </v-flex>
      </v-layout>
      <v-divider light></v-divider>
      <v-card-actions class="pa-3">
        {{user.fullName}}'s Rate
        <v-spacer></v-spacer>
        <v-rating
        :value="3"
          color="yellow darken-3"
          background-color="grey darken-1"
          empty-icon="$vuetify.icons.ratingFull"
          ripple
          readonly
        ></v-rating>
      </v-card-actions>
    </v-card>
  </section>
</template>

<script>
export default {
  props: ["user"],
  methods: {},
  computed: {},
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped src="../styles/components/user-card.scss">
</style>