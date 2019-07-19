<template>
    <div class="item">
      <img :src="item.imgUrl[0]" alt="">
      <div class="info-container">
          <h1>{{item.name}}</h1>
          <p>{{txtToShow}}</p>
      </div>
    </div>
</template>
<script>
export default {
    props: ['item'],
    computed: {
    txtToShow(){
            if (this.item.description.length <= 100) return this.item.description
            return this.item.description.substr(0, 100) + '...'
        },
  }
}
</script>
<style lang="scss" scoped src="../styles/components/on-profile-preview.scss">
</style>