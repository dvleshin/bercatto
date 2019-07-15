<template>
<section v-if="compData">
  <GmapMap
      class="map"
      ref="mapRef"
      :center="compData"
      :zoom="16"
      map-type-id="terrain"
      style="width: 100%; height: 500px"
    >
      <GmapMarker
        :position="compData"
        :clickable="true"
        :draggable="true"
      />
    </GmapMap>
</section>
</template>

<script>
export default {
  props: {
    compData: Object,
  },
  data() {
    return {
    };
  }
};
</script>
<style>
</style>

