<template>
  <section>
    <v-parallax :height="500" dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
      <v-layout align-center column justify-center>
          <v-icon @click="goToAddPage" class="add-icon">add</v-icon>
          <v-icon @click="goToSignUpPage" class="signup-icon">remove</v-icon>
        <h1 class="display-2 font-weight-thin mb-3">Barcatto</h1>
        <h4 class="subheading">Barter, bargain and swap unique items</h4>
        <h4 class="subheading">
          <v-text-field
            @change="search"
            v-model="filter.txt"
            append-icon="search"
            solo
            placeholder="Search..."
            autofocus
          ></v-text-field>
        </h4>
       <img class="loader" v-if="showSearchLoading" src="../../public/img/loader.gif" alt="">
      </v-layout>
    </v-parallax>
    <MainItemList @remove="remove" :items="itemsToShow"></MainItemList>
  </section>
</template>

<script>
import MainItemList from "../components/MainItemList";
import itemsService from "../services/ItemService";
export default {
  created() {
    this.$store.dispatch({ type: "getTrendingItems" }).then(() => {
      this.isLoading = false;
    });
  },
  data() {
    return {
      isLoading: true,
      filter: {},
      showSearchLoading: false
    };
  },
  computed: {
    itemsToShow() {
      return this.$store.getters.trendingItems;
    }
  },
  methods: {
    remove(itemId) {
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
      
    },

      goToAddPage() {
          this.$router.push(`add`)
        },
      goToSignUpPage() {
          this.$router.push(`signup`)
        },
        
    search() {
      if(!this.filter.txt) return
      this.timeout = setTimeout(() => {
        this.$router.push(`item?searchBy=${this.filter.txt}`);
        this.filter.txt = "";
      }, 2000);
      this.showSearchLoading = true;
    }
  },
  components: {
    MainItemList
  },

  destroyed() {
    clearTimeout(this.timeout);
  }
};
</script>

<style lang="scss" scoped src="../styles/views/home-page.scss">
</style>
