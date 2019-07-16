<template>
  <section>
    <signUp></signUp>
  </section>
</template>

<script>
import SignUp from "../components/signUp.vue"

export default {
    created() {
    this.loggedInUser = this.$store.getters.loggedInUser;
    console.log('SingUp page created:', this.loggedInUser);
    if(loggedInUser) this.$router.push('/');
  },
    data() {
        return {
            loggedInUser: null,
        }
    },
    components:{
        SignUp
    }
}
</script>
<style lang="scss" scoped src="../styles/views/signup-page.scss">
</style>


