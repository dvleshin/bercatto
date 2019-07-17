<template>
  <section class="search-container">
    <div class="main-container">
      <FilterSection class="filter-section" @filterBy="onFilter" :searchBy="filterBy.category"></FilterSection>
      <SortSection @sortBy="onSort"></SortSection>
      <MainItemList class="item-list" @remove="remove" :items="itemsToShow"></MainItemList>
    </div>
  </section>
</template>

<script>
import MainItemList from "../components/MainItemList.vue";
import FilterSection from "../components/FilterSection.vue";
import SortSection from "../components/SortSection.vue";
import Header from "../components/Header.vue";
export default {
  created() {
    this.filterBy.category = this.$route.query.searchBy;
    this.$store
      .dispatch({ type: "loadItems", creteria: this.filterBy })
      .then(() => {
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
    },
    getFilterBy() {
      return this.$store.getters.getFilterBy;
    }
  },
  methods: {
    onFilter(filterBy) {
      console.log(filterBy);
      this.$store.dispatch({ type: "onFilter", filterBy: filterBy });
    },
    onSort(sortBy) {
      console.log('Search Results sortBy:', sortBy);
      
      let filteredBy = this.getFilterBy
      console.log('Search Results filteredBy:', filteredBy);
      if(!filteredBy) filteredBy = this.filterBy
      const filterBy = Object.assign(filteredBy, sortBy)
      //console.log("SearchResults sortBy:", sortBy, "filter:", filterBy);
      this.$store.dispatch({ type: "onSort", filterBy: filterBy });

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
  components: {
    MainItemList,
    FilterSection,
    SortSection
  }
};
</script>
<style lang="scss" scoped src="../styles/views/search-results.scss">
</style>


