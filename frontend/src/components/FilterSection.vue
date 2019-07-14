<template>
  <form @submit.prevent="emitFilterBy">
      <v-text-field v-model="filterBy.txt" label="Tags"></v-text-field>
      <v-select :items="sortItems" v-model="filterBy.sortBy" label="Sort by"></v-select>
      <v-btn color="blue" type="submit">Search</v-btn>
      <v-btn color="red" @click="clearForm" fab small><v-icon>clear</v-icon></v-btn>
    </form>
</template>

<script>
export default {
  
  methods: {
    clearForm() {
      this.filterBy = {}
    },
    emitFilterBy() {
console.log(this.filterBy);

    }
  },
  computed: {},
  data() {
    return {
      filterBy:{},
      sortItems: ["Value", "Views"]
    };
  },
  components: {
   
  }
};
</script>
<style lang="scss" scoped src="../styles/components/filter-section.scss">
</style>