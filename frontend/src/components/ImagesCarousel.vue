<template>
  <section>
    <v-carousel :cycle="cycle">
      <v-carousel-item v-for="(img,idx) in imgs" :key="idx" :src="img.src"></v-carousel-item>
    </v-carousel>
  {{compData}}
  </section>
</template>

<script>
export default {
  props: ["compData"],
  data() {
    return {
      cycle: false,
      imgs: [
        {
          src: "http://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        },
        {
          src: "http://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        },
        {
          src: "http://cdn.vuetifyjs.com/images/carousel/bird.jpg"
        },
        {
          src: "http://cdn.vuetifyjs.com/images/carousel/planet.jpg"
        }
      ]
    };
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

