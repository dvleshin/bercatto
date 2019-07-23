<template>
  <div v-if="!item.isSold" class="item" @click="goToItem(item._id)">
    <img :src="item.imgUrl[0]">
    <div class="info-container">
      <h1>{{item.name}}</h1>
      <p>{{txtToShow}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["item"],
  methods: {
    goToItem(id) {
      this.$router.push("/item/" + id);
    }
  },
  computed: {
    txtToShow() {
      if (this.item.description.length <= 200) return this.item.description;
      return this.item.description.substr(0, 200) + "...";
    }
  }
};
</script>
<style lang="scss" scoped src="../styles/components/on-profile-preview.scss">
</style>