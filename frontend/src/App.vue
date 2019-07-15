<template>
 <section>
  <heads></heads>
  <router-view></router-view>

 </section>
</template>

<script>
import Home from './views/Home.vue'
import Heads from './components/Header.vue'
export default {
  name: 'App',
  components: {
    Home,
    Heads
  },
  data () {
    return {
      //
    }
  }
}
</script>
