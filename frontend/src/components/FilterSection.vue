<template>
  <form @submit.prevent="emitFilterBy">
    <v-text-field v-model="filterBy.name" label="Name"></v-text-field>
    <v-select :items="condition" v-model="filterBy.condition" label="Condition"></v-select>
    <v-select :items="category" v-model="filterBy.category" label="Category"></v-select>
    <v-btn color="blue" type="submit">Search</v-btn>
    <v-btn color="red" @click="clearForm" fab small>
      <v-icon>clear</v-icon>
    </v-btn>
  </form>
</template>
<script>
export default {
  props: {
    searchBy: String,
  },
  methods: {
    clearForm() {
      this.filterBy = {};
    },
    emitFilterBy() {
      this.$emit('filterBy', this.filterBy)
    }
  },
  computed: {},
  data() {
    return {
      filterBy: {
        category: this.searchBy,
      },
      category: ["Kinds", "Arts", "Home"],
      condition: ["New", "Used", "Good", "Excellent"]
    };
  },
  components: {}
};
</script>
