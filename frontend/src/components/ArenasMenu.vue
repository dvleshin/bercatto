<template>
  <section v-if="loggedInUser">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-badge left color="red" transition>
          <template v-slot:badge>
            <span>{{activeArenas}}</span>
          </template>
          <v-icon v-on="on" large color="grey lighten-1">tab</v-icon>
        </v-badge>
      </template>
      <v-list v-if="loggedInUser.arenas.length">
        <v-list-tile
          @click="seeArenas(arena.url)"
          :class="{done: arena.isDone , 'list-item' :arena.url}"
          v-for="(arena, index) in arenas"
          :key="index"
        >
          <v-list-tile-title>{{loggedInUser._id===arena.owner.id ? 'Owner' : 'Buyer'}}</v-list-tile-title>
          <img :src="arena.mainItemImgUrl" alt />
        </v-list-tile>
      </v-list>
    </v-menu>
  </section>
</template>

<script>
export default {
  props: ["loggedInUser"],
  created() {},
  data() {
    return {};
  },
  methods: {
    seeArenas(url) {
      this.$router.push("/" + url);
      // this.$router.replace(url);
      // this.$router.go(url);
    }
  },
  computed: {
 
    arenasUrls() {
      return this.loggedInUser.arenas.map(arena => arena.url);
    },
    activeArenas() {
      return this.loggedInUser.arenas.filter(arena => !arena.isDone).length;
    },
    arenas() {
      const arenas = [...this.loggedInUser.arenas]
      return arenas.sort((a, b) => {
        if (a.isDone) {
          return 1;
        }
        return -1;
      });
    }
  }
};
</script>
<style lang="scss" scoped src="../styles/components/arenas-menu.scss">
</style>

