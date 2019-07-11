<template>
  <section>
    <MainItemPreview @remove="remove" v-for="item in items" :item="item" :key="item._id"></MainItemPreview>
  </section>
</template>

<script>
import MainItemPreview from './MainItemPreview.vue'
export default {
  props: {
    items: {
      type: Array,
      validator(val) {
        return val != [];
      }
    },
  },
  methods: {
     remove(itemId) {
      this.$emit('remove' , itemId)
    }
  },
  computed: {},
  data() {
    return {};
  },
  components: {
    MainItemPreview
  }
};
</script>
<style>
</style>