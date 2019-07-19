<template>
  <section>
    <v-parallax :height="600" dark style="z-index: 300;" src="https://res.cloudinary.com/dbcg46m3l/image/upload/v1563431109/main-bg_uwei5x.jpg">
      <v-layout align-center column justify-center>
        <div class="main-navbar">
          <div><span class="logo">barcattö</span></div>
          <ul>
            <!-- <li @click="goToSignUpPage"><v-icon color="#fff">person</v-icon> signup</li> -->
            <Signup>
              <li><v-icon color="#fff">person</v-icon> signup</li>
            </Signup>
            <li @click="goToAddPage"><v-icon color="#fff">account_circle</v-icon> login</li>
          </ul>
        </div>
        <h1 class="display-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
        <h4 class="subheading">Barter, bargain and swap unique items</h4>
        <h4 class="subheading">
        <v-text-field
          class="search"
            @change="search"
            v-model="filter.category"
            append-icon="search"
            :append-icon-cb="search"
            solo
            style="border-radius: 30px"
            placeholder="Search..."
            autofocus
          ></v-text-field>
        </h4>
        <img class="loader" v-if="showSearchLoading" src="../../public/img/loader.gif" alt />
      </v-layout>
    </v-parallax>
    <MainItemList @remove="remove" :items="itemsToShow"></MainItemList>
  </section>
</template>

<script>
import MainItemList from "../components/MainItemList";
import itemsService from "../services/ItemService";
import Signup from "../components/SignUp-v2.vue";
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
         this.$noty.error("Item Deleted", {
  killer: true,
  timeout: 3000,
  theme:'semanticui',
  layout: 'topRight'
})
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
      this.$router.push(`add`);
    },
    goToSignUpPage() {
      this.$router.push(`signup`);
    },

    search() {
      if (!this.filter.category) return;
      this.timeout = setTimeout(() => {
        this.$router.push(`item?searchBy=${this.filter.category}`);
        this.filter.category = "";
      }, 2000);
      this.showSearchLoading = true;
    }
  },
  components: {
    MainItemList,
    Signup
    
  },

  destroyed() {
    clearTimeout(this.timeout);
  }
};
</script>

<style lang="scss" scoped src="../styles/views/home-page.scss">
</style>
