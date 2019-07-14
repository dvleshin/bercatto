<template>
<section>
  <GmapMap
      class="map"
      ref="mapRef"
      :center="{lat:32.088007, lng:34.8031678}"
      :zoom="16"
      map-type-id="terrain"
      style="width: 100%; height: 400px"
    >
      <GmapMarker
        :position="{lat:32.088007, lng:34.8031678}"
        :clickable="true"
        :draggable="true"
      />
    </GmapMap>
  {{compData}}
</section>
</template>

<script>
export default {
  props: ["compData"],
  data() {
    return {
      markers: [
        { position: { lat: 32.084701, lng: 34.781793}, city: 'Tel Aviv' },
      ]
    };
  }
};
</script>
<style>
</style>

