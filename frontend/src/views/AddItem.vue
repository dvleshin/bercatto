<template>
  <section>
    <Header></Header>
    <UserCard></UserCard>
    <div class="edit-form">
      <h1>{{item._id ? 'Edit Item' : 'Add Item'}}</h1>
      <div>
        <v-form @submit.prevent="saveItem">
          <v-text-field v-model="item.name" label="Name" required></v-text-field>
          <v-text-field v-model="item.condition" label="condition" required type="text"></v-text-field>
          <v-text-field v-model="item.value" label="approximate value" required type="text"></v-text-field>
          <v-text-field v-model="item.description" label="description" required type="text"></v-text-field>
          <v-text-field
            v-model="item.tags"
            label="tags"
            hint="seperade by commas"
            required
            type="text"
          ></v-text-field>
          <v-select :items="categories" v-model="item.category" label="Categoty"></v-select>
          <UploadImages @uploadedImgs="uploadedImgs"></UploadImages>
          <v-btn color="blue" type="submit">{{item._id ? 'Save' : 'Add'}}</v-btn>
          <v-btn color="red" @click="goBack">
            <v-icon dark left>arrow_back</v-icon>back
          </v-btn>
        </v-form>
      </div>
    </div>
  </section>
</template>

<script>
import Header from '../components/Header.vue'
import UploadImages from "../components/UploadImages.vue"
import UserCard from '../components/UserCard.vue'
export default {
  created() {
    const itemId = this.$route.params.id;
    if (itemId) {
      this.$store
        .dispatch({ type: "getItemById", itemId: itemId })
        .then(item => {
          this.item = JSON.parse(JSON.stringify(item));
          
        });
    }
  },
  data() {
    return {
      showImgLoading:false,
      loggedInUser: null,
      item: {
        name: "",
        category: "",
        ownerId: "",
        imgUrl: [],
        views: 0,
        description: "",
        condition: "",
        tags: '',
        uploadedAt: null
      },
      categories: [
        "tech",
        "music",
        "craft",
        "arts",
        "sport",
        "tools",
        "kids",
        "home",
        "cars"
      ]
    };
  },
  computed: {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    uploadedImgs(imgs) {
      imgs.forEach(img => {
        let src =img.url
        this.item.imgUrl.push(src)   
      })
    },
    saveItem() {
      this.item.uploadedAt = Date.now();
      this.item.isPicked = false;
      this.item.isAdmin = false;
      this.item.tags = this.item.tags.split(',')
      this.item.ownerId = JSON.parse(sessionStorage.loggedInUser)._id;
      this.item.value = +this.item.value;
      this.$store
        .dispatch({ type: "saveItem", item: { ...this.item } })
        .then(() => {
          this.$noty.success("Item Added Succsessfully", {
  killer: true,
  timeout: 3000,
  theme:'semanticui',
  layout: 'topRight'
})
          this.$router.push("/");
        });
    }
  },
  components: {
    UploadImages,
    Header,
    UserCard,
  }
};
</script>
<style lang="scss" scoped src="../styles/views/add-item.scss">
@import "../styles/lib/vuejs-noty.css";

</style>


