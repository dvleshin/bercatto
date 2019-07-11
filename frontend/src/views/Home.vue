<template>
  <section>
    <v-parallax dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
      <v-layout align-center column justify-center>
        <h1 class="display-2 font-weight-thin mb-3">Barcatto</h1>
        <h4 class="subheading">Quid pro quo</h4>
        <h4 class="subheading">
          <v-text-field append-icon="search" solo placeholder="Search..." autofocus></v-text-field>
        </h4>
      </v-layout>
    </v-parallax>
    <TopItems :items="items"></TopItems>
    <TopItems :items="items"></TopItems>
    <TopItems :items="items"></TopItems>
    <TopItems :items="items"></TopItems>
    <TopItems :items="items"></TopItems>
    <TopItems :items="items"></TopItems>
  </section>
</template>

<script>
import TopItems from "../components/TopItems.vue";
import itemsService from "../services/ItemService";
export default {
  created() {
    this.items = itemsService.query();
  },
  data() {
    return {
      items: []
    };
  },
  components: {
    TopItems
  }
};
</script>
