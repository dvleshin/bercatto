<template>
  <section>
    <MainItemPreview v-for="item in items" :item="item" :key="item._id"></MainItemPreview>
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
  methods: {},
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