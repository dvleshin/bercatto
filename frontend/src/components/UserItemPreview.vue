<template>
    <div class="item">
      <img :src="item.imgUrl[0]" alt="">
      <div class="info-container">
          <h1>{{item.name}}</h1>
          <p>{{item.description}}</p>
      </div>
    </div>
</template>
<script>
export default {
    props: ['item']
}
</script>
<style lang="scss" scoped src="../styles/components/on-profile-preview.scss">
</style>