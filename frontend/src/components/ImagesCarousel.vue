<template>
  <section>
    <v-carousel :cycle="cycle">
      <v-carousel-item v-for="(img,idx) in imgs" :key="idx" :src="img.src"></v-carousel-item>
    </v-carousel>
  </section>
</template>

<script>
export default {
  props: ["compData"],
  created(){
    this.setImages()
  },
  data() {
    return {
      cycle: false,
      imgs: []
    };
  },
  methods: {
    setImages() {
      this.compData.forEach(img => {
        let src = {src: `${img}`}
        this.imgs.push(src)   
      })
    }
  },  
  activated() {
    this.cycle = true;
  },

  deactivated() {
    this.cycle = false;
  },
};
</script>
<style>
</style>

