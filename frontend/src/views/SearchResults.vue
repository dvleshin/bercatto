<template>
  <div>
    <Header></Header>
    <section class="search-container">
      <div class="main-container">
        <FilterSection class="filter-section" @filterBy="onFilter" :searchBy="filterBy.category"></FilterSection>
        <SortSection @sortBy="onSort"></SortSection>
        <SearchItemList class="item-list" @remove="remove" :searchItems="itemsToShow"></SearchItemList>
      </div>
    </section>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import SearchItemList from "../components/SearchItemList.vue";
import FilterSection from "../components/FilterSection.vue";
import SortSection from "../components/SortSection.vue";
export default {
  created() {
    this.filterBy.category = this.$route.query.searchBy;
    this.$store
      .dispatch({ type: "loadItems", filterBy: this.filterBy })
      .then(() => {
        this.isLoading = false;
      });
  },
  data() {
    return {
      items: null,
      filterBy: {}
    };
  },
  computed: {
    itemsToShow() {
      this.items = this.$store.getters.itemsToshow;
      return this.items;
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
      console.log("Search Results sortBy:", sortBy);

      let filteredBy = this.getFilterBy;
      //console.log("Search Results filteredBy:", filteredBy);
      if (!filteredBy) filteredBy = this.filterBy;
      const filterBy = Object.assign(filteredBy, sortBy);
      //console.log("SearchResults sortBy:", sortBy, "filter:", filterBy);
      this.$store.dispatch({ type: "onSort", filterBy: filterBy });
    },
    remove(itemId) {
      console.log("onmain", itemId);
      this.$store
        .dispatch({ type: "deleteItem", itemId })
        .then(() => {
          this.$noty.error("Item Deleted", {
            killer: true,
            timeout: 3000,
            theme: "semanticui",
            layout: "topRight"
          });
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
    SearchItemList,
    FilterSection,
    SortSection,
    Header
  }
};
</script>
<style lang="scss" scoped src="../styles/views/search-results.scss">
</style>


