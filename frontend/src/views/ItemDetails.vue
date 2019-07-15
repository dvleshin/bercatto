<template>
  <section v-if="item" class="item-details">
    <div class="item-container">
      <v-toolbar color="cyan" dark tabs>
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
    </div>
    <div clas="user-container" v-if="user">
      <material-card class="v-card-profile">
        <v-avatar slot="offset" class="mx-auto d-block" size="130">
          <img
            src="https://bookingagentinfo.com/wp-content/uploads/2014/12/Travis-Scott-Contact-Information.jpg"
          />
        </v-avatar>
        <v-card-text class="text-xs-center">
            <h6 class="category text-gray font-weight-thin mb-3">{{user.userName}}</h6>
            <h4 class="card-title font-weight-light">{{user.fullName}}</h4>
          </v-card-text>
      </material-card>
    </div>
  </section>
</template>

<script>
import UserMap from "../components/UserMap.vue";
import ImagesCarousel from "../components/ImagesCarousel.vue";
export default {
  created() {
    this.$store
      .dispatch({ type: "getItemById", itemId: this.$route.params.id })
      .then(item => {
        this.item = item;
        this.tabs[0].data = item.imgUrl;

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
                //console.log('Item Details', cords);
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
    ImagesCarousel
  },
  computed: {},
  methods: {}
};
</script>
<style scoped lang="scss">
@import "../styles/views/item-details.scss";
</style>


