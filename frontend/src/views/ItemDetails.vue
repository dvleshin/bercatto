<template>
  <div>
    <Header></Header>
    <section v-if="user" class="item-section">
      <div class="item">
        <div class="item-title">
          <h1>{{item.name}}</h1>
        </div>
        <div class="item-details">
          <div class="item-container">
            <v-toolbar color="cyan" dark tabs height="0">
              <template v-slot:extension>
                <v-tabs v-model="tab" color="cyan" grow>
                  <v-tabs-slider color="yellow"></v-tabs-slider>
                  <v-tab v-for="(tab, idx) in tabs" :key="idx">
                    <span>{{ tab.label }}</span>
                    <v-icon>{{ tab.icon }}</v-icon>
                  </v-tab>
                </v-tabs>
              </template>
            </v-toolbar>
            <v-tabs-items v-model="tab">
              <v-tab-item v-for="(tab, idx) in tabs" :key="idx">
                <v-card flat>
                  <component :is="tab.comp" :comp-data="tab.data"></component>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
            <div class="desc">
              <p>Description:</p>
              <p>{{item.description}}</p>
              <ul>
                <li><span>Tags:</span> {{showTags}}</li>
                <li><span>Category:</span> {{item.category}}</li>
                <li><span>Added:</span> {{humanTime(item.uploadedAt)}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="user-area">
        <UserCard :user="user"></UserCard>
        <button class="back" @click="goBack">Back to main</button>
      </div>
    </section>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import UserMap from "../components/UserMap.vue";
import ImagesCarousel from "../components/ImagesCarousel.vue";
import UserCard from "../components/UserCard.vue";
import moment from "moment";

export default {
  created() {
    this.$store
      .dispatch({ type: "getItemById", itemId: this.$route.params.id })
      .then(item => {
        this.item = item;
        this.tabs[0].data = item.imgUrl;
        this.setItemView();

        this.$store
          .dispatch({ type: "getUserById", userId: this.item.ownerId })
          .then(user => {
            this.user = user;

            this.$store
              .dispatch({
                type: "getCordsByName",
                location: this.user.adress.city
              })
              .then(cords => {
                this.tabs[1].data = cords;
              });
          });
      });
  },
  data() {
    return {
      item: null,
      user: null,
      tab: null,
      tabs: [
        {
          label: "Images",
          icon: "image",
          comp: "ImagesCarousel",
          data: null
        },
        {
          label: "Location",
          icon: "map",
          comp: "UserMap",
          data: null
        }
      ]
    };
  },
  components: {
    UserMap,
    ImagesCarousel,
    Header,
    UserCard
  },
  computed: {
    showTags(){
      return this.item.tags.join(', ')
    }
  },
  methods: {
    humanTime(timestamp) {
      let oneDay = Date.now() + 1 * 24 * 60 * 60 * 1000;

      if (oneDay > timestamp) {
        return moment(timestamp).fromNow();
      } else {
        return moment(timestamp).format("LL");
      }
    },
    setItemView() {
      this.item.views += 1;
      this.$store
        .dispatch({ type: "saveItem", item: { ...this.item } })
        .then(() => {});
    },
    goBack(){
      this.$router.go(-1)
    }
  }
};
</script>
<style scoped lang="scss">
@import "../styles/views/item-details.scss";
</style>


