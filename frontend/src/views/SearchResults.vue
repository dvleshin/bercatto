<template>
<section>
  <h1>SearchResults</h1>
  <FilterSection></FilterSection>
  <MainItemList @remove="remove" :items="itemsToShow"></MainItemList>
</section>
</template>

<script>
import MainItemList from '../components/MainItemList.vue'
import FilterSection from '../components/FilterSection.vue'
export default {
  created() {
    this.filterBy.txt = this.$route.query.searchBy;
    this.$store.dispatch({ type: "loadItems", creteria:this.filterBy }).then(() => {
      this.isLoading = false;
    });
  },
  data() {
    return {
      filterBy: {}
    };
  },
  computed: {
       itemsToShow() {
      return this.$store.getters.itemsToshow;
    }
  },
  methods: {
       remove(itemId) {
      console.log("onmain", itemId);
      this.$store
        .dispatch({ type: "deleteItem", itemId })
        .then(() => {
          // Swal.fire({
          //   position: "top-end",
          //   type: "success",
          //   title: "The toy is deleted",
          //   showConfirmButton: true,
          //   timer: 2000
          // });
        })
        .catch(err => {
          // Swal.fire({
          //   position: "top-end",
          //   type: "error",
          //   title: "Oops...",
          //   text: "Looks Like Something went wrong!",
          //   timer: 2000
          // });
        });
       }   
  },
  components:{
      MainItemList,
      FilterSection
  }
}
</script>
<style lang="scss" scoped src="../styles/views/search-results.scss">
</style>


