<template>
<section class="search-container">
  <div class="main-container">
  <FilterSection class="filter-section" @filterBy="onFilter" :searchBy="filterBy.category"></FilterSection>
  <MainItemList class="item-list" @remove="remove" :items="itemsToShow"></MainItemList>
  </div>
</section>
</template>

<script>
import MainItemList from '../components/MainItemList.vue'
import FilterSection from '../components/FilterSection.vue'
import Header from '../components/Header.vue'
export default {
  created() {
    this.filterBy.category = this.$route.query.searchBy;
    this.$store.dispatch({ type: "loadItems", creteria: this.filterBy }).then(() => {
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
      onFilter(filterBy) {
        console.log(filterBy);
        this.$store.dispatch({type: 'onFilter', filterBy: filterBy})
      },
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


