<template>
  <div>
    <Header></Header>
    <section v-if="user" class="user-profile">
      <div class="user-info">
        <UserCard class="user-card" :user="user"></UserCard>
        <UserReviews class="user-reviews" :user="user"></UserReviews>
      </div>
      <UserItemList class="user-item-list" :items="userItems"></UserItemList>
    </section>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import UserItemList from "../components/UserItemList.vue";
import UserReviews from "../components/UserReviews.vue";
import UserCard from "../components/UserCard.vue";
export default {
  created() {
    console.log('@');
    this.$store
      .dispatch({ type: "getUserById", userId: this.$route.params.id })
      .then(user => {
        this.user = user;
        
      });
    this.$store
      .dispatch({ type: "getUserItems", userId: this.$route.params.id })
      .then(items => {

        this.userItems = items;
      });
  },
  data() {
    return {
      user: null,
      userItems: []
    };
  },
  computed: {},
  methods: {},
  components: {
    UserItemList,
    UserCard,
    UserReviews,
    Header
  }
};
</script>
<style lang="scss" scoped src="../styles/views/user-profile.scss">
</style>


