<template>
  <div class="img-upload">
    <v-btn v-if="!showImgLoading" small color="blue-grey" class="white--text" @click="pickFile">
      UPLOAD IMAGES <v-icon  dark size="30">cloud_upload</v-icon>
    </v-btn>
    <input @change="handleUploadImage" multiple ref="image" hidden type="file" />
               <img class="loader" v-if="showImgLoading" src="../../public/img/loader.gif" alt="">

    <img v-for="(img, idx) in uploadedImgs" :key="idx" :src="img.url">
     
  </div>
</template>
<script>
export default {
  data() {
    return {
      uploadedImgs: null,
      showImgLoading:false
    };
  },
  methods: {
    pickFile() {
      this.$refs.image.click();
    },
    handleUploadImage(ev) {
      this.showImgLoading=true
      const files = ev.target.files;
      if (files === undefined) return console.log(`error! I can't this file`);
        //this.loading = true;
        this.$store
          .dispatch({ type: "uploadImgs", imgs: files })
          .then(uploadedImgs => {
            this.uploadedImgs = uploadedImgs;  
            // this.loading = false;
            this.$emit('uploadedImgs', this.uploadedImgs)
            this.showImgLoading=false
          });
    }
  }
};
</script>

<style scoped lang="scss">
.loader {
    height: 50px;
}

img {
  height: 60px;
}
</style>

