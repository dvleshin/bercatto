<template>
  <div>
    <Header></Header>
    <section v-if="user" class="user-profile">
      <div class="user-info">
        <UserCard :user="user"></UserCard>
        <UserReviews class="user-reviews" :user="user"></UserReviews>
      </div>
      <UserItemList :items="userItems"></UserItemList>
    </section>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import UserItemList from "../components/UserItemList.vue";
import UserReviews from "../components/UserReviews.vue";
import UserCard from "../components/UserCard.vue";
export default {
  created() {
   this.init()
  },
  data() {
    return {
      user: null,
      userItems: []
    };
  },
  computed: {},
  methods: {
    init() {
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
    }
  },
  watch: {
    $route: function(newVal, oldVal) {
      this.init()
    }
  },
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


