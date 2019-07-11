<template>
<div>
  <h1>Top Items</h1>
    <MainList :items="items"></MainList>
</div>
</template>

<script>
import MainList from '../components/MainList.vue'

export default {
    props: {
    items: {
      type: Array,
      validator(val){
        return val != []
      }
    }
  },
    created() {
    },
    data() {
        return {
            
        }
    },
    computed: {
        
    },
    methods: {
        
    },
    components: {
        MainList
    }
}
</script>
<style lang="scss" scoped src="../styles/components/top-items.scss">
</style>


