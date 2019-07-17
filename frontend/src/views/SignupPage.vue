<template>
  <div>
    <Header></Header>
    <section>
      <signUp></signUp>
    </section>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import SignUp from "../components/signUp.vue"

export default {
  created() {
    this.loggedInUser = this.$store.getters.loggedInUser;
    console.log("SingUp page created:", this.loggedInUser);
    if (loggedInUser) this.$router.push("/");
  },
  data() {
    return {
      loggedInUser: null
    };
  },
  components: {
    SignUp,
    Header
  }
};
</script>
<style lang="scss" scoped src="../styles/views/signup-page.scss">
</style>


