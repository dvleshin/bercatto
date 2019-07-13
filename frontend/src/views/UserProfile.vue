<template>
<section>
  <h1>UserProfile</h1>
{{user}}
</section>
</template>

<script>
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
  methods: {}
};
</script>
<style lang="scss" scoped src="../styles/views/user-profile.scss">
</style>


