<template>
  <section v-if="!item.isSold" class="item">
    <v-card max-width="300">
      <v-img
        @click.stop="seeItem"
        class="white--text card-image"
        height="200px"
        :src="item.imgUrl[0]"
      >
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox></v-flex>
          </v-layout>
        </v-container>
      </v-img>
      <v-card-title>
        <div>
          <h2>{{item.name}}</h2>
          <span class="grey--text">Added {{humanTime(item.uploadedAt)}}</span>
          <br />
          <span>{{item.condition}}</span>
          <br />
          <span>{{txtToShow}}</span>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn @click="goToUserProfile(item.ownerId)" flat color="orange">See dealer's profile</v-btn>
        <v-btn flat color="orange" @click="goToArena(item.Id)">Go To Arena!</v-btn>
      </v-card-actions>
    </v-card>
    <img src="../../public/img/trending.png" v-if="item.views>50" class="trending" />

    <v-icon
      v-if="loggedInUser&&loggedInUser._id===item.ownerId"
      class="delete"
      @click="remove(item._id)"
    >remove</v-icon>
  </section>
</template>
<script>
import moment from "moment";
export default {
  props: ["item"],
  created() {
     if (!this.loggedInUser) {
      this.$store
        .dispatch({
          type: "loadLoggedInUser",
          userId: JSON.parse(sessionStorage.loggedInUser)._id
        })
    }
  },
  data() {
    return {
      moment: moment,
    };
  },
  methods: {
    humanTime(timestamp) {
      return moment(timestamp).fromNow();
    },
    remove(itemId) {
      this.$emit("remove", itemId);
    },
    seeItem() {
      this.$router.push(`item/${this.item._id}`);
    },
    goToUserProfile() {
      this.$router.push(`user/${this.item.ownerId}`);
    },
    goToArena() {
      // console.log('@@@');
      
      if (!sessionStorage.loggedInUser) {
        this.$noty.error("Please Login Or Signup", {
          killer: true,
          timeout: 3000,
          theme: "semanticui",
          layout: "topRight"
        });
        return;
      }
      else if (loggedInUser_id===this.item.ownerId) {
        this.$noty.error("You Can't Trade Your Own Items! ", {
          killer: true,
          timeout: 3000,
          theme: "semanticui",
          layout: "topRight"
        });
        return;
      }

      this.$router.push(`arena?id=${this.item._id}`);
    }
  },
  computed: {
    loggedInUser(){
      
      return this.$store.getters.loggedInUser
    },
    txtToShow() {
      if (this.item.description.length <= 100) return this.item.description;
      return this.item.description.substr(0, 100) + "...";
    }
  }
};
</script>

<style lang="scss" scoped src="../styles/components/main-item-preview.scss">
@import "../styles/lib/vuejs-noty.css";
</style>
