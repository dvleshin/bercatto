<template>
  <router-view></router-view>
</template>

<script>
import Home from './views/Home.vue'
export default {
  name: 'App',
  components: {
    Home
  },
  data () {
    return {
      //
    }
  }
}
</script>
