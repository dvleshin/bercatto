<template>
<section>
  <h1>UserProfile</h1>

<UserItemList :items="user.items"></UserItemList>
</section>
</template>

<script>
import  UserItemList from '../components/UserItemList.vue'
export default {
  created() {
    this.$store
      .dispatch({ type: "getUserById", userId: this.$route.params.id })
      .then(user => {
        this.user = user;
      });
  },
  data() {
    return {
        user: {}
    };
  },
  computed: {},
  methods: {},
  components: {
      UserItemList
  }
};
</script>
<style lang="scss" scoped src="../styles/views/user-profile.scss">
</style>


