<template>
  <section>
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
import UploadImages from "../components/UploadImages.vue";
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
      loggedInUser: null,
      item: {
        name: "",
        category: "",
        ownerId: "",
        imgUrl: "",
        views: null,
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
this.item.imgUrl = [imgs[0].url]
console.log(this.item.imgUrl);

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
          this.$router.push("/");
        });
    }
  },
  components: {
    UploadImages
  }
};
</script>
<style lang="scss" scoped src="../styles/views/add-item.scss">
</style>


