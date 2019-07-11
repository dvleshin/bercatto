<template>
<section>
  <li>{{item}}</li>
  <button @click="remove(item._id)">X</button> <!--v-if user is the owner -->
</section>
</template>
<script>
export default {
  props: ["item"],
  methods: {
    remove(itemId) {
      this.$emit('remove' , itemId)
    }
  },
};
</script>
