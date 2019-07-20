<template>
  <section class="main-container">
    <div class="cards-container">
      <MainItemPreview @remove="remove" v-for="item in searchItems" :item="item" :key="item._id"></MainItemPreview>
    </div>
  </section>
</template>

<script>
import MainItemPreview from "./MainItemPreview-v2.vue";
export default {
  props: {
    searchItems: Array,
  },
  methods: {
    remove(itemId) {
      this.$emit("remove", itemId);
    }
  },
  components: {
    MainItemPreview
  }
};
</script>
<style lang="scss" scoped src="../styles/components/main-list.scss">
</style>