<template>
  <section>
    <div class="cards-container">
    <MainItemPreview  @remove="remove" v-for="item in items" :item="item" :key="item._id"></MainItemPreview>
     <h1 v-if="!items.length">  No items to show</h1>
    </div>
  </section>
</template>

<script>
import MainItemPreview from './MainItemPreview.vue'
// import MainItemPreview from './MainItemPreview-v2.vue'
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
<style lang="scss" scoped src="../styles/components/main-list.scss">
</style>