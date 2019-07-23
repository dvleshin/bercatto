<template>
  <!-- <section v-if="!item.isSold" class="item"> -->
  <section class="item">
    <img class="loader" v-if="!itemUser" src="../../public/img/loader.gif" alt />
    <div class="card" v-else>
      <div class="img-container">
        <img :src="item.imgUrl[0]" @click.stop="seeItem" />
      </div>
      <div class="content-container">
        <div class="title" @click.stop="seeItem">{{item.name}}</div>
        <div class="user-profile">
          <img :src="itemUser.profileImg" />
          <span class="user-name" @click="goToUserProfile(item.ownerId)">{{itemUser.fullName}}</span>
          <span>★</span>
          <span>{{rating}}</span>
        </div>
        <div class="item-details">
          <span>Condition: {{item.condition}}</span>
          <span>Added: {{humanTime(item.uploadedAt)}}</span>
        </div>
        <button @click="goToArena(item.Id)" class="arena-btn">Go to Arena</button>
      </div>
      <img src="../../public/img/trending.png" v-if="item.views>50" class="trending" />
      <v-icon
      v-if="loggedInUser&&loggedInUser._id===item.ownerId"
      class="delete"
      @click="remove(item._id)"
    >remove</v-icon>
    </div>
  </section>
</template>
<script>
import moment from "moment";
export default {
  props: {
    item: Object
  },
 created() {
   if(sessionStorage.loggedInUser) {
     if (!this.loggedInUser) {
      this.$store.dispatch({type: "loadLoggedInUser", userId: JSON.parse(sessionStorage.loggedInUser)._id})
      }}
      this.$store.dispatch({ type: "getUserById", userId: this.item.ownerId })
      .then(user => {
        this.itemUser = user;
      });
  },
  data() {
    return {
      moment: moment,
      loggedInUserId: null,
      itemUser: null
    };
  },
  methods: {
    humanTime(timestamp) {
      let oneDay = Date.now() + 1 * 24 * 60 * 60 * 1000;

      if (oneDay > timestamp) {
        return moment(timestamp).fromNow();
      } else {
        return moment(timestamp).format("LL");
      }
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
      // console.log("@@@");

      if (!sessionStorage.loggedInUser) {
        this.$noty.error("Please Login Or Signup", {
          killer: true,
          timeout: 3000,
          theme: "semanticui",
          layout: "topRight"
        });
        return;
      } else if (this.loggedInUser._id === this.item.ownerId) {
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
    },
    rating() {
      if (this.itemUser.reviews.length) {
        const rating = this.itemUser.reviews.reduce((accumulator, review) => {
          return accumulator + review.rating;
        }, 0);
        const avrg = rating / this.itemUser.reviews.length;
        return avrg.toFixed(1);
      } else return 0;
    }
  }
};
</script>

<style lang="scss" scoped src="../styles/components/main-item-preview.scss">
@import "../styles/lib/vuejs-noty.css";
</style>
