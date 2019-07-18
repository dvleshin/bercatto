<template>
  <section class="item">
    <div class="card">
      <div class="img-container">
        <img :src="item.imgUrl[0]">
      </div>
      <div class="content-container">
        <div class="title">
        {{item.name}}
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import moment from "moment";
export default {
  props: ["item"],
  created() {
    if (sessionStorage.loggedInUser) {
      this.loggedInUserId = JSON.parse(sessionStorage.loggedInUser)._id;
    }
  },
  data() {
    return {
      moment: moment,
      loggedInUserId: null
    };
  },
  methods: {
    humanTime(timestamp) {
      return moment(timestamp).fromNow();
    },
    remove(itemId) {
      this.$emit("remove", itemId);
    },
    seeItem() {
      this.$router.push(`item/${this.item._id}`);
    },
    goToUserProfile() {
      this.$router.push(`user/${this.item.ownerId}`);
    },
    goToArena() {
      if (!sessionStorage.loggedInUser) return;

      this.$router.push(`arena?id=${this.item._id}`);
    }
  },
  computed: {
    txtToShow() {
      if (this.item.description.length <= 100) return this.item.description;
      return this.item.description.substr(0, 100) + "...";
    }
  }
};
</script>

<style lang="scss" scoped src="../styles/components/main-item-preview.scss">
</style>
