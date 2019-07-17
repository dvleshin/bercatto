<template>
  <section>
    sort by
    <v-select
      :items="views"
      v-model="byViews"
      label="Views"
      @input="emitSortBy(byViews==='High-Low'? {byViews: 1}:{byViews: -1})"
    ></v-select>
    <v-select
      :items="createdAt"
      v-model="byCreatedAt"
      label="Date"
      @input="emitSortBy(byCreatedAt === 'Newest first' ? {byCreatedAt: 1}:{byCreatedAt: -1})"
    ></v-select>
    <v-select
      :items="name"
      v-model="byName"
      label="Name"
      @input="emitSortBy(byName === 'A-Z' ? {byName: 1}:{byName: -1})"
      
    ></v-select>
  </section>
</template>
<script>
export default {
  props: {
    searchBy: String
  },
  methods: {
    emitSortBy(sortBy) {
      //console.log('SortSection:', sortBy);
      this.$emit("sortBy", sortBy);
    }
  },
  data() {
    return {
      byViews: "",
      byCreatedAt: null,
      byName: "",
      views: ["High-Low", "Low-High"],
      createdAt: ["Newest first", "Oldest first"],
      name: ["A-Z", "Z-A"]
    };
  }
};
</script>
