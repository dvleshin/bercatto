<template>
  <div class="img-upload">
    <v-btn fab small color="blue-grey" class="white--text" @click="pickFile">
      <v-icon dark size="30">cloud_upload</v-icon>
    </v-btn>
    <input @change="handleUploadImage" multiple ref="image" hidden type="file" />
    {{item.imgs}}
  </div>
</template>
<script>
export default {
  data() {
    return {
      item: {
        imgs: ""
      }
    };
  },
  methods: {
    pickFile() {
      this.$refs.image.click();
    },
    handleUploadImage(ev) {
      const files = ev.target.files;
      //console.log(ev.target.files);

      if (files === undefined) return console.log(`error! I can't this file`);
        //this.loading = true;
        this.$store
          .dispatch({ type: "uploadImgs", imgs: files })
        //   .then(uploadedImgs => {
        //     this.toy.img = uploadedImg.url;
        //     this.loading = false;
        //   });
    }
  }
};
</script>
