<template>
  <section>
    <v-parallax
      :height="600"
      dark
      style="z-index: 300;"
      src="https://res.cloudinary.com/dbcg46m3l/image/upload/v1563431109/main-bg_uwei5x.jpg"
    >
      <v-layout align-center column justify-center>
        <div class="main-navbar">
          <div>
            <span class="logo">barcattö</span>
          </div>
          <div>
            <MainHeader></MainHeader>
          </div>
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
    <v-content>
      <v-container fluid>
        <MainItemList @remove="remove" :tranding="true">
          <h2 slot="title">Hot Items:</h2>
          <div slot="more" class="more-btn"></div>
        </MainItemList>
      </v-container>
      <v-container fluid>
        <MainItemList @remove="remove" :category="'home'">
          <h2 slot="title">Home category:</h2>
          <div slot="more" class="more-btn"><button @click="goToMoreItems('home')">More items</button></div>
        </MainItemList>
        <MainItemList @remove="remove" :category="'arts'">
          <h2 slot="title">Arts category:</h2>
           <div slot="more" class="more-btn"><button @click="goToMoreItems('arts')">More items</button></div>
        </MainItemList>
        <MainItemList @remove="remove" :category="'music'">
          <h2 slot="title">Music category:</h2>
           <div slot="more" class="more-btn"><button @click="goToMoreItems('music')">More items</button></div>
        </MainItemList>
        <MainItemList @remove="remove" :category="'sport'">
          <h2 slot="title">Sport category:</h2>
           <div slot="more" class="more-btn"><button @click="goToMoreItems('sport')">More items</button></div>
        </MainItemList>
        <MainItemList @remove="remove" :category="'tech'">
          <h2 slot="title">Tech category:</h2>
           <div slot="more" class="more-btn"><button @click="goToMoreItems('tech')">More items</button></div>
        </MainItemList>
      </v-container>
    </v-content>
  </section>
</template>

<script>
import itemsService from "../services/ItemService";
import MainItemList from "../components/MainItemList.vue";
import MainHeader from '../components/MainHeader.vue'
import Signup from "../components/SignUp-v2.vue";
export default {
  created() {
    },
  data() {
    return {
      isLoading: true,
      filter: {},
      showSearchLoading: false
    };
  },
  methods: {
    remove(itemId) {
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
    },
    goToMoreItems(category){
      this.$router.push(`item?searchBy=${category}`);
    }
  },
  components: {
    MainItemList,
    Signup,
    MainHeader
  },

  destroyed() {
    clearTimeout(this.timeout);
  }
};
</script>

<style lang="scss" scoped src="../styles/views/home-page.scss">
</style>
