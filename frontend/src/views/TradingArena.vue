<template>
  <section v-if="ownerItem && owner">
    <h1>Owner: {{owner.fullName}}</h1>
    <img :src="ownerItem.imgUrl[0]" alt />
    <h1>buyer: {{loggedInUser.fullName}}</h1>

    <!-- {{this.ownerItem}} -->
  </section>
</template>


<script>
export default {
  created() {
     
      
    this.loggedInUser = JSON.parse(sessionStorage.loggedInUser).user;
    this.$store
      .dispatch({ type: "getItemById", itemId: this.$route.query.id })
      .then(item => {
        this.ownerItem = item;
        this.$store
          .dispatch({ type: "getUserById", userId: this.ownerItem.ownerId })
          .then(user => {
            this.owner = user;
          });
      });
  },
  data() {
    return {
      loggedInUser: null,
      ownerItem: null,
      owner: null
    };
  },
  computed: {},
  methods: {}
};
</script>
<style lang="scss" scoped src="../styles/views/trading-arena.scss">
</style>


