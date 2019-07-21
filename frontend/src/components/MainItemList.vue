<template>
  <section class="main-container">
    <slot name="title"></slot>
    <div class="cards-container">
      <MainItemPreview @remove="remove" v-for="item in items" :item="item" :key="item._id"></MainItemPreview>
    </div>
    <slot name="more"></slot>
  </section>
</template>

<script>
//import MainItemPreview from './MainItemPreview.vue'
import MainItemPreview from "./MainItemPreview-v2.vue";
export default {
  props: {
    tranding: Boolean,
    category: String
  },
  created() {
    if(this.tranding) {
      this.$store.dispatch({ type: "getTrendingItems", limit: 4}).then(() => {
      this.isLoading = false;
      this.items = this.$store.getters.trendingItems
    })
    } else {
      this.$store.dispatch({ type: "loadItems", filterBy: {category: this.category, limit: 4}}).then(() => {
          this.items = this.$store.getters.itemsToshow;
        })
    }
  },
  methods: {
    remove(itemId) {
      this.$emit("remove", itemId);
    }
  },
  computed: {
   
  },
  data() {
    return {
      items: [],
    };
  },
  components: {
    MainItemPreview
  }
};
</script>
<style lang="scss" scoped src="../styles/components/main-list.scss">
</style>