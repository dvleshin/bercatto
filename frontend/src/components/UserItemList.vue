<template>
  <section class="cards-container">
    <h1>OnProfileItemList</h1>
    <UserItemPreview @remove="remove" v-for="item in items" :item="item" :key="item._id"></UserItemPreview>
  </section>
</template>

<script>
import UserItemPreview from './UserItemPreview.vue'
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
    UserItemPreview
  }
};
</script>
<style lang="scss" scoped src="../styles/components/on-profile-list.scss">
</style>